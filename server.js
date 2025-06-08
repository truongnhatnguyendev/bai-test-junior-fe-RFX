import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use((req, res, next) => {
  const endpoints = ["/users", "/workpackages"];
  const pathParts = req.path.split("/").filter(Boolean);
  const resourceName = pathParts[0];
  const baseEndpoint = "/" + resourceName;

  if (req.method === "GET" && req.path === "/users/types") {
    const items = router.db.get("users").value();

    const types = items.map((item) => ({
      type: item.type,
      userId: item.userId,
    }));
    return res.jsonp(types);
  }
  if (req.method === "GET" && req.path === "/users/userName") {
    const items = router.db.get("users").value();
    const types = items.map((item) => ({
      userName: item.userName,
      userId: item.userId,
    }));
    return res.jsonp(types);
  }

  const isListRequest =
    pathParts.length === 1 &&
    endpoints.includes(baseEndpoint) &&
    req.method === "GET";

  const isDetailRequest =
    pathParts.length === 2 &&
    endpoints.includes(baseEndpoint) &&
    req.method === "GET";

  // Handle LIST: /orders?page=1&limit=10&status=processing&logic=AND
  if (isListRequest) {
    const query = req.query;
    const page = parseInt(query.page || "1", 10);
    const limit = parseInt(query.limit || "10", 10);
    const logic = (query.logic || "AND").toString().toUpperCase(); // AND / OR

    const filters = Object.fromEntries(
      Object.entries(query).filter(([key, value]) => {
        const str = String(value).trim().toLowerCase();
        return (
          !["page", "limit", "logic", "sortBy", "order"].includes(key) &&
          value !== undefined &&
          value !== null &&
          str !== "" &&
          str !== "undefined" &&
          str !== "null"
        );
      })
    );

    let items = router.db.get(resourceName).value();

    const hasFilters = Object.keys(filters).length > 0;
    const getValueByPath = (obj, path) => {
      if (typeof path !== "string") return undefined;
      return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    };
    const fieldMapping = {
      phone: "contact.phone",
      email: "contact.email",
    };
    // Thêm logic sắp xếp sau khi lọc nhưng trước khi phân trang
    try {
      if (hasFilters) {
        items = items.filter((item) => {
          const conditions = Object.entries(filters).map(([key, value]) => {
            if (String(value).toLowerCase() === "all") return true;
            const actualKey = fieldMapping[key] || key;
            const itemVal = getValueByPath(item, actualKey);
            if (itemVal == null || itemVal === undefined || itemVal === "")
              return false;

            if (Array.isArray(value)) {
              return value.some((v) =>
                String(itemVal).toLowerCase().includes(String(v).toLowerCase())
              );
            }

            if (typeof value === "string" || typeof value === "number") {
              const val = String(value).toLowerCase();
              if (key === "status")
                return String(itemVal).toLowerCase().startsWith(val);
              return String(itemVal).toLowerCase().includes(val);
            }

            return false;
          });

          return logic === "AND"
            ? conditions.every(Boolean)
            : conditions.some(Boolean);
        });
      }
    } catch (err) {
      console.error("Filter error:", err);
      return res.status(500).jsonp({ error: "Server filtering error" });
    }

    // ✅ Thêm xử lý sắp xếp
    const sortBy = query.sortBy?.toString();
    const order = (query.order || "asc").toString().toLowerCase(); // asc hoặc desc

    if (sortBy) {
      items = items.sort((a, b) => {
        const aVal = a?.[sortBy];
        const bVal = b?.[sortBy];

        const aStr = (aVal ?? "").toString().trim().toLowerCase();
        const bStr = (bVal ?? "").toString().trim().toLowerCase();

        return order === "asc"
          ? aStr.localeCompare(bStr)
          : bStr.localeCompare(aStr);
      });
    }

    // ✅ Luôn áp dụng phân trang
    const start = (page - 1) * limit;
    const paginatedItems = items.slice(start, start + limit);
    const pageCount = Math.ceil(items.length / limit);

    return res.jsonp({
      data: paginatedItems,
      page,
      count: paginatedItems.length,
      pageCount,
      total: items.length,
    });
  }

  // Handle DETAIL: /.../:id
  if (isDetailRequest) {
    const id = pathParts[1];
    const item = router.db.get(resourceName).find({ id }).value();

    if (!item) return res.status(404).jsonp({ error: "Not found" });
    return res.jsonp(item);
  }

  next();
});

server.use(router);

server.listen(3001, () => {
  console.log("JSON Server is running at http://localhost:3001");
});
