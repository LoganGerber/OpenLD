// import { ipcRenderer } from 'electron';

const fill = document.querySelector('#fill') as Element;
const sections = document.querySelectorAll('.drag-section');


fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

sections.forEach((section: Element) => {
	section.addEventListener('dragover', dragOver);
	section.addEventListener('dragenter', dragEnter);
	section.addEventListener('dragleave', dragLeave);
	section.addEventListener('drop', drop);
});


function dragStart(e: DragEvent) {
	let target: Element = e.target as Element;
	target.classList.add('hold');
	setImmediate(() => target.classList.add('invisible'));
}

// TODO: Change fill to create its own floating element in the dom, rather than become invisible while dragging.

function dragEnd(e: DragEvent) {
	let target: Element = e.target as Element;
	target.classList.remove('hold');
	target.classList.remove('invisible');
}

function dragOver(e: DragEvent) {
	e.preventDefault();
}

function dragEnter(e: DragEvent) {
	e.preventDefault();
	getTarget(e).classList.add('hovered');
}

function dragLeave(e: DragEvent) {
	getTarget(e).classList.remove('hovered');
}

function drop(e: DragEvent) {
	let target = getTarget(e);
	target.classList.remove('hovered');
	target.append(fill);
}

function getTarget(e: Event): Element {
	return e.target as Element;
};
