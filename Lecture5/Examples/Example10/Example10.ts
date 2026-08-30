// Asynchronous  Programming

// Handeling Error on Asynchronous context


function fetchData(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = false; // change to true to simulate success
      success ? resolve("Data loaded!") : reject("Network error");
    }, 1000);
  });
}

async function loadApp() {
  try {
    const result = await fetchData(); // if it fail and promise rejected it raise error
    console.log(result);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

loadApp();