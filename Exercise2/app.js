
//1
function js_style() {
    let text = document.getElementById('text');
    text.style.fontFamily = 'Arial';
    text.style.color = 'red';
    
}
//2
function getFormvalue()
{
  var x=document.getElementById("form1");
  for (var i=0;i<x.length;i++)
  {
   if (x.elements[i].value!='Submit')
    {  
      console.log(x.elements[i].value);
     }  
   }
}
//3
document.getElementsByTagName('body')[0].style.backgroundColor = '#80808017';
//4
function getAttributes() {
    let element = document.getElementById('w3r');
    let hrefValue = element.getAttribute('href');
    let hreflangValue = element.getAttribute('hreflang');
    let relValue = element.getAttribute('rel');
    let targetValue = element.getAttribute('target');
    let typeValue = element.getAttribute('type');
    console.log(hrefValue)
    console.log(hreflangValue);
    console.log(relValue);
    console.log(targetValue);
    console.log(typeValue);
}

//5
function insert_Row() {
    let tableElement = document.getElementById('sampleTable');
let trElement = document.createElement('tr');
let tdElement1 = document.createElement('td');
let tdElement2 = document.createElement('td');

tdElement1.innerText = 'Row3 cell1';
tdElement2.innerText = 'Row3 cell2';

trElement.appendChild(tdElement1);
trElement.appendChild(tdElement2);
tableElement.appendChild(trElement);
}

//6
function changeContent() {
    let myTable = document.getElementById('myTable');
    let trList = myTable.getElementsByTagName('tr');
    for(let i = 0; i < trList.length; i++){
        let tdList = trList[i].getElementsByTagName('td');
        for(let j = 0; j < tdList.length; j++){
            tdList[j].innerText = 'Cong Van ' + i + j;
        }
    }
}

//7
function createTable() {
    let newTable = document.createElement('table');
    newTable.setAttribute('border', '1');
    for (let i =0; i < 2; i++){
        let newTr = document.createElement('tr');
        for (let j = 0; j < 2; j++) {
            let newTd = document.createElement('td');
            newTd.innerText = 'Row' + i + ' Cell' + j;
            newTr.appendChild(newTd);
        }
        newTable.appendChild(newTr);
    }
    document.getElementsByTagName('body')[0].appendChild(newTable);
}

//8
function removecolor() {
    let eSelected = document.getElementById('colorSelect');
    eSelected.remove(eSelected.selectedIndex);
}

//9
function getOptions() {
    let selectElement = document.querySelector('#mySelect');
    let itemList = selectElement.getElementsByTagName('option');

    console.log('count: ' + itemList.length);

    for(let i = 0 ; i<itemList.length; i++){
        console.log(itemList[i].value);
    }
}