
let form = document.getElementById('snippet_form');


form.addEventListener('click', (event) => {

  if (event.target.matches('button.tag_remove')) {
    event.target.parentElement.remove();

  } else if (event.target.matches('button.tag_add')) {
    let tag_field = document.getElementById('tag_add');
    let container = document.getElementById('tag_container');

    if (tag_field.value !== '') {
  
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
