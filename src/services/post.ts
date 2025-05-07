export const getPost = (): Promise<any> => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      if (typeof window !== "undefined") {
        try {
          const data = localStorage.getItem("post");
          resolve(data ? JSON.parse(data) : '');
          if (!data) savePost('');
        } catch {
          resolve('');
        }
      }

      return resolve('');
    }, 200);
  });
};

export const savePost = (data: any) => {
  if (typeof window === "undefined") return;

  try {
    const value = data?.content?.trim() ? { ...data } : '';
    localStorage.setItem("post", JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};
