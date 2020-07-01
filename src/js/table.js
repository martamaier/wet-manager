import * as _ from 'lodash';
import {ACTION_TYPES, deleteElement, employees} from "./index";
import {handleForm, renderForm} from "./form";

const extraTableHeading = ['edit', 'delete'];

export function renderColumnHeading(heading) {
    return `<th scope="col">${_.startCase(heading)}</th>`;
}

export function renderEmployeeRow(dataObj, tableName) {
    const values = Object.values(dataObj);
    return `
        <tr>
            ${values.map((value) => `<td>${value}</td>`).join(' ')}
            <td><button type="button" class="btn btn-primary" data-id="${dataObj.ID}" data-table="${tableName}">Edit</button></td>
            <td><button type="button" class="btn btn-danger" data-id="${dataObj.ID}" data-table="${tableName}">Delete</button></td>
        </tr>
    `;
}

export function renderTable(data, tableName) {

    const headings = Object.keys(data[0]).concat(extraTableHeading);
    const main = document.querySelector('.main');
    main.innerHTML = '';
    const template = `
   <div class="${tableName.toLowerCase()}-table">
    <h2>${tableName}</h2>
    <button type="button" class="btn btn-success" data-table="${tableName}">Add</button>
    <table class="table">
      <thead>
      <tr>${headings.map((heading) => renderColumnHeading(heading)).join(' ')}</tr>
      </thead>
      <tbody>
      ${data.map((item) => renderEmployeeRow(item, tableName)).join(' ')}
      </tbody>
    </table>
   </div>
    `;
    main.insertAdjacentHTML('beforeend', template);

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const actionPayload = {
                id: event.target['dataset'].id,
                actionType: event.target['innerText'],
                tableName: event.target['dataset'].table,
            };

            switch (actionPayload.actionType) {
                case ACTION_TYPES.Add:
                    addElement(actionPayload);
                    break;
                case ACTION_TYPES.Delete:
                    deleteElement(actionPayload);
                    break;
                default:
                    editElement(actionPayload);
            }
        })
    })
}

function editElement(payload) {
    const element = employees.find((employee) => employee.ID === Number.parseFloat(payload.id));
    console.log('It should edit item ', element);
    handleForm(element)
}

function addElement(payload) {
    console.log('It should add new item');
    handleForm();
}

// const Employee = function (name, lastName, description, photo, title) {
//     this.name = name;
//     this.lastName = lastName;
//     this.description = description;
//     this.photo = photo;
//     this.title = title;
// };
