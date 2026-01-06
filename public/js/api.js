export async function getArr(pathJson) {
  try {
    const response = await fetch(pathJson, {
      method: 'GET',
      cache: 'no-store', // Отключает кэширование
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Ошибка при загрузке данных: ", error);
    throw error;
  }
}

export async function saveChanges(pathPhp, arr) {
  const response = await fetch(pathPhp, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arr),
  })
    .then((response) => response.text())
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
}
