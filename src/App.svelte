<script>
import Task from "./components/Task.svelte";
import Header from "./components/Header.svelte";

let tasks = [];
let currentText = "";

function generateUID() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function addTask() {

  const newTask = {
    'id': generateUID(),
    'text': currentText,
    'isChecked': false,
    'date': Date.now(),
  };

  tasks.unshift(newTask)
  tasks = tasks
  console.log(tasks)
}

</script>

<main class="min-h-screen pt-4 md:pt-4 pb-2 px-4 md:px-0 body-bg-dark">
  <Header></Header>

  <div class="max-w-lg mx-auto p-3 md:p-3 my-4 rounded-lg shadow-2xl bg-slate-900">
    <section>
      <div class="flex justify-center">
        <div class="mb-0 w-full">
          <input type="text" class="form-control block w-full px-3 py-1.5 text-base font-normal bg-clip-padding border border-solid rounded ease-in-out m-0 focus:border-blue-600 focus:outline-none bg-slate-600 focus:bg-slate-700 text-white focus:text-gray-200 border-slate-500" id="exampleFormControlInput1" placeholder="Enter a task" bind:value={currentText}>
        </div>
        <div class="flex space-x-2 justify-center pl-1">
          <button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out !outline-none" on:click={() => addTask()}>
            Add
          </button>
        </div>
      </div>

      <section id="task-list">

        {#each tasks as task}
          <Task text={task.text}></Task>
        {/each}
      </section>
    </section>
  </div>

</main>
