var a, b;
a = false;
b = false;
document.write(
    '<h1 class="top">Таблица истинности логических функций</h1>'
);
document.writeln(
    `<div class="flex_table">
        <div class="table_title">
        <div>A</div>
        <div>B</div>
        <div>!A</div>
        <div>A&&B</div>
        <div>A||B</div>
        </div>`
);
a = false;
b = false;
document.writeln(
        `<div>
         <div>${a}</div>
         <div>${b}</div>
         <div>${!a}</div>
         <div>${a && b}</div>
         <div>${a || b}</div>
         </div>`
);
a = false;
b = true;
document.writeln(
         `<div>
         <div>${a}</div>
         <div>${b}</div>
         <div>${!a}</div>
         <div>${a && b}</div>
         <div>${a || b}</div>
         </div>`
);
a = true;
b = false;
document.writeln(
        `<div>
         <div>${a}</div>
         <div>${b}</div>
         <div>${!a}</div>
         <div>${a && b}</div>
         <div>${a || b}</div>
         </div>`
);
a = true;
b = true;
document.writeln(
        `<div>
         <div>${a}</div>
         <div>${b}</div>
         <div>${!a}</div>
         <div>${a && b}</div>
         <div>${a || b}</div>
         </div>
    </div>`
);
