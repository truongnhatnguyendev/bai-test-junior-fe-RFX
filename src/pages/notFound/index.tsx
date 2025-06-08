import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-4">Oops! Trang bạn đang tìm không tồn tại.</p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-primary text-white rounded hover:bg-blue-900 transition"
      >
        Quay lại trang chủ
      </Link>
    </div>
  );
}
