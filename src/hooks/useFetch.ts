"use client";
import { RestBaseService } from "@/services/rest-base.service";
import { useEffect, useState } from "react";

export function useFetch<T>(service: RestBaseService<T>) {
  const [datas, setDatas] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resp = await service.getMany();
        setDatas(resp as T[]);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { datas, loading };
}
