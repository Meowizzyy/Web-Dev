document.addEventListener("DOMContentLoaded", function() {
    let inputBox = document.getElementById("input_box");
    let addButton = document.getElementById("add_button");
    let taskList = document.getElementById("task_list");
    let deleteButtonT = document.getElementById("del-btn");
    let definition = document.getElementById("def"); 

    addButton.addEventListener("click", function() {
        let taskText = inputBox.value.trim();
        let defText = definition.value.trim();
        
        if (taskText !== "" && defText !== "") {
            let li = document.createElement("li"); 
            li.style.marginBottom = "10px";

            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.style.marginRight = "10px";

            let titleSpan = document.createElement("span");
            titleSpan.textContent = taskText;
            titleSpan.style.fontWeight = "bold"; 

            let br = document.createElement("br");

            let defSpan = document.createElement("span");
            defSpan.textContent = defText;
            defSpan.style.fontStyle = "italic";

            checkbox.addEventListener("change", function() {
                if (checkbox.checked) {
                    titleSpan.style.textDecoration = "line-through"; 
                    defSpan.style.textDecoration = "line-through";
                } else {
                    titleSpan.style.textDecoration = "none"; 
                    defSpan.style.textDecoration = "none"; 
                }
            });

            let deleteButton = document.createElement("button");
            deleteButton.textContent = "❌";
            deleteButton.style.marginLeft = "20px";
            deleteButton.style.cursor = "pointer";

            deleteButton.addEventListener("click", function() {
                li.remove(); 
            });

            li.appendChild(checkbox);
            li.appendChild(titleSpan);
            li.appendChild(br);
            li.appendChild(defSpan);
            li.appendChild(deleteButton);
            taskList.appendChild(li); 

            definition.value = "";
            inputBox.value = ""; 
        }
    });

    deleteButtonT.addEventListener("click", function() {
        taskList.innerHTML = ""; 
    });

    inputBox.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addButton.click();
        }
    });
});
