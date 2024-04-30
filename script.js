//fetching data from url as json

const req = new XMLHttpRequest();
req.open(
  "GET",
  "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"
);
req.send();

let request = function() {

  const data = JSON.parse(this.responseText) ;
  
  let root = document.getElementById("root");
  let section = document.createElement("section")
  section.setAttribute("class","header");
  
  let heading = `<h1>Pagination with DataList</h1>`
  section.innerHTML = heading;
  let sectionTwo = document.createElement("section");
  sectionTwo.setAttribute("class","field");
  let table = document.createElement("table");
  table.setAttribute("class","table-content");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");

  let sectionThree = document.createElement("section");
  sectionThree.setAttribute("class","bottom");
  
  
  
 
   let headtags = "<tr>";
   let keys = Object.keys(data[0]);
   for(let i=0; i < keys.length; i++){
      headtags += `<th>${keys[i]}</th>`  
    }
    headtags +="</tr>"
    thead.innerHTML = headtags;
    table.append(thead);
    
    console.log(data);
    let page_number = 1;
    let items = 10;
    // for total page numbers
    const pageCount = Math.ceil(data.length/items);
   

    // displaying data in table
    let display = ((page)=>{
      let tags = '';
      page--;

      let start = items * page;
      let end = start + items;
      let paginatedItems = data.slice(start, end);

      paginatedItems.map(e => {
       
              tags += `<tr>
              <td>${e.id}</td>
              <td>${e.name}</td>
              <td>${e.email}</td>
              </tr>`
            });
            
           
            tbody.innerHTML = tags; 
            table.appendChild(tbody);
            sectionTwo.append(table);     
                              
    });

    let setPagination = (() => {
      
      //for displaying in pagination column
      
        for(let i = 1; i <= pageCount; i++){
        let  pageli  = paginationli(i);
          
        let ul = document.getElementById("pagination");
        ul.append(pageli);
        
      }

        for(let i = pageCount/2+1; i <= li.length; i++){
          let hide_li = document.getElementById(`btn-${i}`)
          hide_li.style.display = "none";
      }
    })
    

    // onclick functionality of each page number

    function paginationli(page){
      
      let list = document.createElement("li");
      list.setAttribute("class","btn");
      list.setAttribute("id",`btn-${page}`)
      list.innerText = page;
      
      
       if(page_number == page) list.classList.add('active');

       list.addEventListener('click', function(){
         page_number = page;
         display(page_number);
         

         let current_li = document.querySelector('#pagination li.active');
         current_li.classList.remove('active');

         list.classList.add('active');
         if(page_number == 1){
          prev.setAttribute("disabled", true);
          
         }else{
          prev.removeAttribute("disabled");
         }

         if(page_number == 10){
          next.setAttribute("disabled",true);
         }else{
          next.removeAttribute("disabled");
         }
      });
      return list;

    }

    function lastclick(){
      page_number=10;

      let current_li = document.querySelector('#pagination li.active');
      current_li.classList.remove('active');
      li[9].classList.add('active');

      first.removeAttribute("disabled");
      last.setAttribute("disabled", true);

      next.setAttribute("disabled", true);
      prev.removeAttribute("disabled");

      for(let i = 0; i<li.length; i++){
        li[i].style.display = "none";
      }

      for(let i = pageCount/2; i<li.length; i++){
        li[i].style.display = "block";
      }
      display(page_number);
    }

   
   
    function firstclick(){
      
      page_number=1;
      let current_li = document.querySelector('#pagination li.active');
      current_li.classList.remove('active');
      li[0].classList.add('active');
      
      first.setAttribute("disabled",true);
      last.removeAttribute("disabled");

      prev.setAttribute("disabled", true);
      next.removeAttribute("disabled");
      for(let i = 0; i < pageCount/2; i++){
        li[i].style.display = "block";
      }

      for(let i = pageCount/2; i<li.length; i++){
        li[i].style.display = "none";
      }
      display(page_number);
    }




    function previousclick(){

      let pages = pageCount;

        if(page_number>1){
          page_number -= 1;
          let current_li = document.querySelector('#pagination li.active');
          current_li.classList.remove('active');
          li[page_number-1].classList.add('active');

          if(page_number <= pages/2){
            let prev_li = document.getElementById(`btn-${page_number}`);
            prev_li.style.display = "block";
            prev_li.classList.add('active');
  
            for(let i = pages; i >= page_number+5 ; i--){

            let hide_li = document.getElementById(`btn-${i}`);
            hide_li.style.display = "none";
            }
          }
          
          if(page_number == 1){
            prev.setAttribute("disabled", true);
            first.setAttribute("disabled", true);
            
           }else{
            next.removeAttribute("disabled");
            last.removeAttribute("disabled");
           }

          display(page_number);
        }
    } 
    
    
    function nextclick(){

      if(page_number<li.length){
        page_number += 1;
        let current_li = document.querySelector('#pagination li.active');
        current_li.classList.remove('active');
        li[page_number-1].classList.add('active');

        if(page_number > pageCount/2){
          let next_li = document.getElementById(`btn-${page_number}`);
          next_li.style.display = "block";
          
          

          for(let i=1; i <= page_number-5; i++){
          let hide_li = document.getElementById(`btn-${i}`);
          hide_li.style.display = "none";
          }
        }
        
        if(page_number == li.length){
          next.setAttribute("disabled", true);
          last.setAttribute("disabled", true);
        }else{
          prev.removeAttribute("disabled");
          first.removeAttribute("disabled");
        }
        display(page_number);
      }

    }

      
    let pagination = `
                      <button type="button" id="first" class="btn btnF">first</button>
                      <button type="button" id="previous" class="btn btnP">prev</button>
                      <div id="pagination"></div>
                      <button type="button" id="next" class="btn btnN">next</button>
                      <button type="button "id="last" class="btn btnL">last</button>`;

     sectionThree.innerHTML += pagination; 
     root.append(section,sectionTwo,sectionThree);
     let li = document.getElementById("pagination").getElementsByTagName("li");
     display(page_number);
     setPagination(); 

     

     let first = document.getElementById("first");
     first.addEventListener("click",firstclick);
     first.setAttribute("disabled", true)
     
     let last = document.getElementById("last");
     last.addEventListener("click",lastclick);
     
     let prev = document.getElementById("previous");
     prev.addEventListener("click",previousclick);
     prev.setAttribute("disabled", true)
     
     let next = document.getElementById("next");
     next.addEventListener("click",nextclick);

    };
    
  req.addEventListener("load", request);
  