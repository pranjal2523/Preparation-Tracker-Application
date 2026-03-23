async function loadTracker(type) {
const response = await fetch(`data/${type}.json`);
const data = await response.json();

const saved = getData(type);
const tbody = document.querySelector("tbody");

data.forEach((item, index) => {
const row = document.createElement("tr");

const status = saved[index]?.status || "Todo";

row.innerHTML = `
<td>${item.name}</td>
<td>
<select onchange="updateStatus('${type}', ${index}, this.value)">
<option ${status==="Todo"?"selected":""}>Todo</option>
<option ${status==="Doing"?"selected":""}>Doing</option>
<option ${status==="Done"?"selected":""}>Done</option>
</select>
</td>
<td><input type="checkbox" onchange="toggle('${type}',${index},'r1')" ${saved[index]?.r1?"checked":""}></td>
<td><input type="checkbox" onchange="toggle('${type}',${index},'r2')" ${saved[index]?.r2?"checked":""}></td>
<td><input type="checkbox" onchange="toggle('${type}',${index},'r3')" ${saved[index]?.r3?"checked":""}></td>
<td><a href="${item.link}" target="_blank">🔗</a></td>
`;

tbody.appendChild(row);
});
}

function updateStatus(type, index, value) {
const data = getData(type);
data[index] = {...data[index], status: value};
saveData(type, data);
}

function toggle(type, index, field) {
const data = getData(type);
data[index] = {...data[index], [field]: !data[index]?.[field]};
saveData(type, data);
}
