import "../scss/main.scss";
import axios from "axios";
import {renderTable} from "./table";
import * as _ from 'lodash';

export const url = 'http://localhost:8080';
const navigationLinks = document.querySelectorAll('.nav-link');
export let employees = [];

navigationLinks.forEach((navLink) => {
    navLink.addEventListener('click', (event) => {
        const value = event.target['innerText'];
        getElements(value);
    });
});

export const ACTION_TYPES = {
    Add: 'Add',
    Edit: 'Edit',
    Delete: 'Delete'
};

export function getElements(value) {
    axios.get(`${url}/${value.toLowerCase()}`).then((res) => {
        renderTable(res.data, value);
        employees = [...employees, ...res.data];
    });
}

export function deleteElement(payload) {
    console.log('It should delete item');
    axios.delete(`${url}/${payload.tableName.toLowerCase()}/${payload.id}`).then(() => {
        console.log('It should delete');
    });
}

export function addElement(payload, employee) {
    axios.post(`${url}/employees`, employee).then(() => {
        console.log('sent to backend');
    });
}

export function editElement(payload, employee) {
    axios.put(`${url}/employees/${payload.id}`, employee).then(() => {
        console.log('should update employee');
    });
}
