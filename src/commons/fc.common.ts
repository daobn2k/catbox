export function isJSON(data: string) {
  try {
    // Thử parse dữ liệu
    JSON.parse(data);
    return true; // Nếu không lỗi, thì là JSON hợp lệ
  } catch (error: any) {
    return false; // Nếu lỗi, thì không phải JSON
  }
}
