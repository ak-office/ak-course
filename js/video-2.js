// Function to fetch JSON data from URL
async function fetchJsonData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching JSON:', error);
  }
}

// Function to generate HTML from JSON data
async function generateHtmlFromJson(url) {
  const jsonData = await fetchJsonData(url);
  if (!jsonData) {
    console.error('No JSON data available');
    return;
  }

  const container = document.getElementById('video-container-2');
  jsonData.forEach(function (item) {
    const anchor = document.createElement('a');
    anchor.href = `play-2.html?id=${item.id}`;

    const divItem = document.createElement('div');
    divItem.classList.add('tvv-item');

    const image = document.createElement('img');
    image.classList.add('loading');
    image.src = item.logo;

    const divName = document.createElement('div');
    divName.classList.add('tvv-name');
    divName.textContent = item.name;

    divItem.appendChild(image);
    divItem.appendChild(divName);
    anchor.appendChild(divItem);
    container.appendChild(anchor);
  });
}

// Call the function to generate HTML from JSON URL
generateHtmlFromJson('video-2.json');