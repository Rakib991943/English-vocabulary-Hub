const createElemets=(anonyns)=>{
const htmlElements = anonyns.map(anonyn=>  `  <span class ='btn'> ${anonyn} </span>  `);
  return htmlElements.join(" ");
}

const manageSpinner=((status)=>{
    if(status){
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');
    }
    else{
           document.getElementById('spinner').classList.add('hidden');
        document.getElementById('word-container').classList.remove('hidden');
    }
})

// Load all lessons
const loadLessons = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/levels/all');
    const lessons = await res.json();
    displayLesson(lessons.data);
}

const removeActive =()=>{
    const lessonsButtons = document.querySelectorAll('.lessons-btn');
    lessonsButtons.forEach((btn)=>{
       btn.classList.remove("btn-secondary")
    })
}

// Load words for a specific level
const loadLevelWord = async (id) => {
    manageSpinner(true);
    removeActive();
    const res = await fetch(`https://openapi.programming-hero.com/api/level/${id}`);
    const words = await res.json();
    const clickBtn = document.getElementById(`lesson-btn-${id}`);
    clickBtn.classList.remove("btn-outline");
    clickBtn.classList.add("btn-secondary");
    displayWord(words.data);
}

const loadWordDetails= async(id)=>{
   const res = await fetch(`https://openapi.programming-hero.com/api/word/${id}`)
   const wordDetails = await res.json();
   DisplayWordDetails(wordDetails.data);
}




const DisplayWordDetails =(word)=>{
   const wordsDetails = document.getElementById('words-details');
   wordsDetails.innerHTML ='';
   const div = document.createElement('div');
   div.classList.add('space-y-3')
   div.innerHTML=`
   <h2 class="card-title text-xl font-bold"> ${word.word} ||  <i class="fa-solid text-2xl font-bold fa-microphone-lines"></i>${word.pronunciation ? word.pronunciation :"sorry"}</h2>
    <p> Meaning and Pronunciation</>
    <p class='font-bangla text-xl font-semibold'>${word.meaning  ? word.meaning:"sorry"} || ${word.pronunciation}</p>

    <div class='space-y-3' > 
     <h2 class='Font Bold'>Example</h2>
     <p class='font-bold'>${word.sentence}</p>
    </div>
     
    <div class ='space-y-3'>
    <h2 class='font-bold'>Synonym</h2>
       <div class =''>
       ${createElemets(word.synonyms)}
       </div>
    <div/>
   `

   wordsDetails.appendChild(div);
   my_modal_5.showModal()
   
   
  
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
    manageSpinner(false)
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
    <i onclick="loadWordDetails(${word.id})" class="fa-solid text-xl  fa-circle-question"></i>
    <i class="fa-solid text-xl fa-volume-high"></i>
   </div>
  </div>
  </div>
  `;
  
        wordContainer.appendChild(div);
        manageSpinner(false);
    });
}

// Display all lessons as buttons
const displayLesson = (data) => {
    const btnContainer = document.getElementById("btn-container");
    btnContainer.innerHTML = '';

    data.forEach(d => {
        const div = document.createElement("div");
        div.innerHTML = `
            <button id="lesson-btn-${d.level_no}"  onclick="loadLevelWord('${d.level_no}')" class="btn btn-outline lessons-btn btn-secondary  my-2">
                <i class="fa-solid fa-book"></i> Lessons - ${d.level_no}
            </button>
        `;
        btnContainer.appendChild(div);
    });
}

// Initialize
loadLessons();


document.getElementById('btn-search').addEventListener('click',async()=>{
    const inputSearch = document.getElementById('input-search');
    const inputvalue = inputSearch.value.trim().toLowerCase();
    // console.log(inputvalue);
    const res = await  fetch("https://openapi.programming-hero.com/api/words/all");
    const data = await res.json();
     const allWords = data.data;
    const filterWords =  allWords.filter(word=>word.word.toLowerCase().includes(inputvalue));
    displayWord(filterWords);
})