(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const p of l.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&d(p)}).observe(document,{childList:!0,subtree:!0});function c(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function d(o){if(o.ep)return;o.ep=!0;const l=c(o);fetch(o.href,l)}})();const E=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
\r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
    \r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li class="filter">\r
                <a class="filterClick"  href="#/">Todos</a>\r
            </li>\r
            <li class="filter">\r
                <a class="filterClick" href="#/active">Pendientes</a>\r
            </li>\r
            <li class="filter">\r
                <a class="filterClick" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`;let f;const P=new Uint8Array(16);function A(){if(!f&&(f=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!f))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return f(P)}const n=[];for(let e=0;e<256;++e)n.push((e+256).toString(16).slice(1));function I(e,t=0){return(n[e[t+0]]+n[e[t+1]]+n[e[t+2]]+n[e[t+3]]+"-"+n[e[t+4]]+n[e[t+5]]+"-"+n[e[t+6]]+n[e[t+7]]+"-"+n[e[t+8]]+n[e[t+9]]+"-"+n[e[t+10]]+n[e[t+11]]+n[e[t+12]]+n[e[t+13]]+n[e[t+14]]+n[e[t+15]]).toLowerCase()}const F=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),C={randomUUID:F};function U(e,t,c){if(C.randomUUID&&!t&&!e)return C.randomUUID();e=e||{};const d=e.random||(e.rng||A)();if(d[6]=d[6]&15|64,d[8]=d[8]&63|128,t){c=c||0;for(let o=0;o<16;++o)t[c+o]=d[o];return t}return I(d)}class k{constructor(t){this.id=U(),this.description=t,this.done=!1,this.createdAt=new Date}}const a={All:"all",Completed:"Completed",Pending:"Pending"},r={todos:[],filter:a.All},q=()=>{L()},L=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=a.All}=JSON.parse(localStorage.getItem("state"));r.todos=e,r.filter=t},g=()=>{localStorage.setItem("state",JSON.stringify(r))},S=(e=a.All)=>{switch(e){case a.All:return[...r.todos];case a.Completed:return[...r.todos.filter(t=>t.done)];case a.Pending:return[...r.todos.filter(t=>!t.done)];default:throw new Error(`${e} is not valid`)}},x=()=>{const e=S(a.Pending);return e.length===0?0:e.length},D=e=>{if(!e)throw new Error("Todo not found");r.todos.push(new k(e)),g()},M=e=>{r.todos=r.todos.map(t=>(e===t.id&&(t.done=!t.done),t)),g()},N=e=>{r.todos=r.todos.filter(t=>t.id!==e),g()},O=()=>{r.todos=r.todos.filter(e=>!e.done),g()},H=(e=a.All)=>{r.filter=e,g()},V=()=>r.filter,i={initStore:q,loadStore:L,gerTodo:S,addTodo:D,toggleTodo:M,deleteTodo:N,deletComplete:O,setFilter:H,getCurrentFilter:V,countPending:x,Filters:a};let m;const R=(e,t=[])=>{if(m||(m=document.querySelector(e)),!m)throw new Error(`Element ${m} not found`);m.innerHTML="",t.forEach(c=>{m.append($(c))})},$=({done:e,description:t,id:c})=>{if(!t)throw new Error("no se envio un toDo");const d=`
    <div class="view">
        <input class="toggle" type="checkbox" ${e?"checked":""}>
        <label>${t}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    `,o=document.createElement("li");return o.setAttribute("data-id",c),e&&o.classList.add("completed"),o.innerHTML=d,o},h={TodoList:".todo-list",NewTodoInput:".new-todo",CleanCompleted:".clear-completed",PendingCount:"#pending-count",Filters:".filter"},j=e=>{const t=(s=i.getCurrentFilter())=>{const u=i.gerTodo(s),w=document.querySelector(h.PendingCount);w.innerText=i.countPending(),R(h.TodoList,u)};(()=>{const s=document.createElement("div");s.innerHTML=E,document.querySelector(e).append(s),t()})();const c=document.querySelector(h.NewTodoInput),d=document.querySelector(h.TodoList),o=document.querySelector(h.CleanCompleted),[l,p,T]=document.querySelectorAll(h.Filters);c.addEventListener("keyup",s=>{s.target.value.trim().length!==0&&s.code==="Enter"&&(i.addTodo(s.target.value),s.target.value="",t())}),d.addEventListener("click",({target:s})=>{const{dataset:u}=s.closest("[data-id]");i.toggleTodo(u.id),s.localName==="button"&&i.deleteTodo(u.id),t()}),o.addEventListener("click",()=>{console.log("borrar"),i.deletComplete(),t()});const y=(s,u)=>{document.querySelectorAll(".filterClick").forEach(b=>{b.classList.remove("selected")});const[v]=s.children;v.classList.add("selected"),i.setFilter(u),t(u)};l.addEventListener("click",()=>y(l,i.Filters.All)),p.addEventListener("click",()=>y(p,i.Filters.Pending)),T.addEventListener("click",()=>y(T,i.Filters.Completed))};i.initStore();j("#app");
