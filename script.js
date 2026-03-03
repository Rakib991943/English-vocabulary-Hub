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
 if(words.length ===0){
    wordContainer.innerHTML =`
     <div class="div text-center col-span-full rounded-xl py-10 space-y-4">
        <img src='./assets/alert-error.png ' class='mx-auto'> 
            <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
            <h2 class="text-4xl font-bold">নেক্সট Lesson এ যান</h2>
        </div>
    `
    return ;
 }
    words.forEach(word => {

        const div = document.createElement("div");
        div.innerHTML = `
            <div class="card bg-base-100 w-96 shadow-sm">
  <div class="card-body">
    <h2 class="card-title text-xl font-bold">${word.word ? word.word :"sorry"}</h2>
    <p> Meaning and Pronunciation</>
    <p class='font-bangla text-xl font-semibold'>${word.meaning  ? word.meaning:"sorry"} || ${word.pronunciation}</p>

    <div class='flex justify-between items-center mt-2'>
   <i class="fa-solid text-xl  fa-circle-question"></i>
   <i class="fa-solid text-xl fa-volume-high"></i>
   </div>
  </div>
   
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