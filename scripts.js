
const $ = (id) => document.getElementById(id);
// create a new array;
const messageData = [];

const fetchCatagoris = async(categoryName) => {
  const loadSpnner =`<section class="flex justify-center items-center">
      <div id="load-Spnner" class="text-center p-4">
        <span class="loading loading-spinner loading-lg"></span>
    </section>`
  const cardContainer = $('card-container');
  const messageReadSec = $('massage-read-section');
  messageReadSec.className += ' hidden';
  cardContainer.innerHTML= loadSpnner;
  let url = `https://openapi.programming-hero.com/api/retro-forum/posts`;
  if(categoryName){
    url=`https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`;
  }
    const res = await fetch(url)
    const data = await res.json();
    
    cardContainer.innerHTML=null;
    messageReadSec.className = messageReadSec.className.replace('hidden', '');
    data.posts.forEach((items)=>{
      console.log('scripts[25]: ', items);
      const addMessage = () => {
        console.log('ckick add messagtfe')
      }

     const div = document.createElement('div');
        div.innerHTML=`
        <div class="hero bg-base-200 border-2 border-[#797DFC] rounded-2xl w-[550px] lg:w-[680px] h-250px] flex p-4">
        <div class="hero-content flex-col lg:flex-row">
        <div class="relative">
        <div class="h-[18px] w-[18px] rounded-full bg-[${items.isActive?'#10B981':'#FF3434'}] absolute top-[-5px] right-[-5px] border-[2px] border-white"></div>
        <img  src="${items.image}" class=" w-20 h-20 rounded-lg shadow-2xl mb-28" />
        </div>
        </div>
        <div class="space-y-4">
          <div class="flex gap-8">
            <h1>${items.category}</h1>
            <p>Author : ${items.author.name}</p>
          </div>
          <div class="space-y-4">
            <h1 class="text-2xl font-bold">${items.title}</h1>
            <p>${items.description}</p>
            <hr class="border-2 w-full border-dashed">
          </div>

      <div class="flex justify-between">
        <div>
            <div class="flex gap-12">
                <div class="flex gap-2">
                    <div>
                        <img src="./images/sms (1).png" alt="">
                    </div>
                    <div>${items.comment_count}</div>
                  </div>
                  <div class="flex gap-2">
                    <div><img src="./images/eye.png" alt=""></div>
                    <div>${items.view_count}</div>
                  </div>
                  <div class="flex gap-2">
                    <div><img src="./images/alarm.png" alt=""></div>
                    <div>${items.posted_time}</div>
                  </div>
              </div>
          </div>
          <button data-title="${items.title}" data-view-count="${items.view_count}" class="btn btn-circle ml-40 message-button">
          <img class="w-8 h-8" src="./images/svg-sms.svg" alt="">
          </button>
              </div> 

          </div>
      </div>

        </div>
      </div>
        `
        cardContainer.appendChild(div)
    })

  const messageButtons = document.getElementsByClassName('message-button');
  // Render message item
  const renderMessage = (data) => {
    const item = document.createElement('div');
    item.innerHTML = `
    <div class="mt-4 bg-white rounded-xl p-2 flex gap-8">
        <p>${data.title}</p>
        <div class="flex gap-2">
          <div><img src="./images/eye.png" alt=""></div>
        <div>${data.viewCount}</div>
      </div>
    </div>
    `
    document.getElementById('message-container').appendChild(item)
  }
  // Loop through each item
  for (let i = 0; i < messageButtons.length; i++) {
    messageButtons[i].addEventListener('click', ()=> {
      const item = { title: messageButtons[i].getAttribute('data-title'), viewCount: messageButtons[i].getAttribute('data-view-count') };
      messageData.push(item)
      console.log('messageData: ', messageData);
      // render message
      renderMessage(item);
      // message count view
      const messageCountView = $('view-count-span');
      messageCountView.innerText = `(${messageData.length})`
    })
  }

}
fetchCatagoris()

const searchBtn = $('search-btn');
searchBtn.addEventListener('click',()=>{
  const inputFild = $('input-fild');
  const searhValue = inputFild.value;
  fetchCatagoris(searhValue);
})




const latestPostCategory=async()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const data = await res.json();
    const latestContainer = $('latest-container');
    data.forEach((News)=>{
        const div = document.createElement('div');
        div.innerHTML=`
        <div class="card lg:w-80 lg:h-[480px] w-[550px] bg-base-100 shadow-xl border-2">
        <figure class="px-10 pt-10">
          <img src="${News.cover_image}" alt="" class="rounded-xl" />
        </figure>
        <div class="card-body items-start text-start">
          <div class="flex ">
            <img class="" src="./images/svg-date.svg" alt="">
            <p class="text-gray-500">${ News.
                author.posted_date ||'No publish date'}</p>
          </div>
          <h1 class="font-bold">${News.title}</h1>
          <p class="text-gray-500">${News.description} </p>
        <div class="flex gap-4">
            <div>
                <img class="w-10 h-10 rounded-full" src="${News.profile_image}" alt="">
                </div>
                <div>
                  <h1 class="font-bold">${News.
                    author.name}</h1>
                  <p class="text-gray-500">${News.author.designation}</p>
                </div>
         </div>
        </div>
      </div>
        `
        latestContainer.appendChild(div);
    })
}
latestPostCategory()

