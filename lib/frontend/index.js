"use strict";
var fill = document.querySelector('#fill');
var sections = document.querySelectorAll('.drag-section');
fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);
sections.forEach(function (section) {
    section.addEventListener('dragover', dragOver);
    section.addEventListener('dragenter', dragEnter);
    section.addEventListener('dragleave', dragLeave);
    section.addEventListener('drop', drop);
});
function dragStart(e) {
    var target = e.target;
    target.classList.add('hold');
    setImmediate(function () { return target.classList.add('invisible'); });
}
// TODO: Change fill to create its own floating element in the dom, rather than become invisible while dragging.
function dragEnd(e) {
    var target = e.target;
    target.classList.remove('hold');
    target.classList.remove('invisible');
}
function dragOver(e) {
    e.preventDefault();
}
function dragEnter(e) {
    e.preventDefault();
    getTarget(e).classList.add('hovered');
}
function dragLeave(e) {
    getTarget(e).classList.remove('hovered');
}
function drop(e) {
    var target = getTarget(e);
    target.classList.remove('hovered');
    target.append(fill);
}
function getTarget(e) {
    return e.target;
}
;
//# sourceMappingURL=index.js.map