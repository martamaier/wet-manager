import {Employee} from "../models/Employee";
import {addElement} from "./index";
import * as _ from 'lodash';

export function renderForm(employee = {}) {
    return `
<form>
  <div class="form-group">
    <label for="name">First Name</label>
    <input type="text" class="form-control" id="name" name="firstName" value="${employee.firstName ? employee.firstName : ''}">
  </div>
  <div class="form-group">
    <label for="lastName">Last Name</label>
    <input type="text" class="form-control" id="lastName" name="lastName" value="${employee.lastName ? employee.lastName : ''}">
  </div>
    <div class="form-group">
    <label for="description">Description</label>
    <textarea class="form-control" id="description" rows="3" name="description">${employee.description ? employee.description : ''}</textarea>
  </div>
    <div class="form-group">
    <label for="photo">Photo</label>
    <input type="text" class="form-control" id="photo" name="photo" value="${employee.photo ? employee.photo : ''}">
  </div>
    <div class="form-group">
    <label for="title">Title</label>
    <input type="text" class="form-control" id="title" name="title" value="${employee.title ? employee.title : ''}">
  </div>
  <button type="submit" class="btn btn-primary">${_.isEmpty(employee) ? 'Add New Employee' : 'Update Employee'}</button>
</form>
    `;
}

export function handleForm(employee = {}) {
    const formContainer = document.querySelector('.form-container');
    formContainer.innerHTML = '';
    formContainer.insertAdjacentHTML('beforeend', renderForm(employee ? employee : {}));

    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formValue = new FormData(form);
        const employee = new Employee(
            formValue.get('firstName'),
            formValue.get('lastName'),
            formValue.get('description'),
            formValue.get('photo'),
            formValue.get('title'));
            addElement({}, employee);
    });
}
