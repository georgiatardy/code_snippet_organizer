// on the add/edit page
let form = document.getElementById('snippet_form');


// add an event listener to the snippet_form
form.addEventListener('click', (event) => {
  // if the remove button is clicked remove that element
  if (event.target.matches('button.tag_remove')) {
    event.target.parentElement.remove();
  // if the add button is clicked add an additional field and button
  } else if (event.target.matches('button.tag_add')) {
    let tag_field = document.getElementById('tag_add');
    let container = document.getElementById('tag_container');
    // and if a field has a value
    if (tag_field.value !== '') {
      // display it to the page
      container.innerHTML += `
        <div class=tag_wrapper>
          <input class='add' type="array" name="tags[]" value="${tag_field.value}" />
          <button type="button" class="tag_remove tag_button">-</button>
        </div>
        `;
    }
    tag_field.value = '';
  }
});
