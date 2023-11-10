const name=document.getElementById('name');
const age=document.getElementById('age');
const email=document.getElementById('email');
const btn=document.getElementById('btn');
const table=document.getElementById('table');
const form=document.getElementById('form');

function validateEmail(email){
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function validate(){
    if(!name.value){
        name.style.outlineColor='red';
        name.focus();
        return;
    } 
    if(!email.value){
        email.style.outlineColor='red';
        email.focus();
        return;
}
if(!validateEmail(email.value)){
    alert("Email no'to'g'ri kiritildi!");
    email.value='';
    email.focus();
    return;
}
if(!age.value){
    age.style.outlineColor='red';
    age.focus();
    return;
 }
}

function createRow(user, index){
    let strRow=`
    <tr>
    <td>${index +1}</td>
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.age}</td>
    <td>
        <span>delete</span>
        <span>update</span>
    </td>
</tr>
    
    `;
    table.innerHTML+=strRow;
}


function createAndSave (){
    let dataLocalStorage=localStorage.getItem('users');
    let data=[];

    if(dataLocalStorage){
        data=JSON.parse(dataLocalStorage);
    }

    let user={};
    user.id=Date.now();
    user.name=name.value;
    user.age=age.value;
    user.email=email.value;


    data.push(user);
    localStorage.setItem('users', JSON.stringify(data));
    createRow(user, data.length-1);
    form.reset();
}


btn.addEventListener('click', function() {
    validate();
    createAndSave();

    
});

window.onload=function(){
    let data=localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):[];
    if(data.length){
        data.forEach((user,index) =>{
            createRow(user, index);
        })
    }
};
