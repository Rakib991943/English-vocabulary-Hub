// Load all lessons
const loadLessons = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/levels/all');
    const lessons = await res.json();
    displayLesson(lessons.data);
}

// Load words for a specific level
const loadLevelWord = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/level/${id}`);
    const words = await res.json();
    displayWord(words.data);
}

// Display words dynamically
const displayWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    words.forEach(d => {
        const div = document.createElement("div");
        div.innerHTML = `
            <div class="card bg-base-100 w-96 shadow-sm">
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
  </div>
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
</div>
        `;
        wordContainer.appendChild(div);
    });
}

// Display all lessons as buttons
const displayLesson = (data) => {
    const btnContainer = document.getElementById("btn-container");
    btnContainer.innerHTML = '';

    data.forEach(d => {
        const div = document.createElement("div");
        div.innerHTML = `
            <button onclick="loadLevelWord('${d.level_no}')" class="btn btn-outline btn-secondary hover:text-white my-2">
                <i class="fa-solid fa-book"></i> Lessons - ${d.level_no}
            </button>
        `;
        btnContainer.appendChild(div);
    });
}

// Initialize
loadLessons();