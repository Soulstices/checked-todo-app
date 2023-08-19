<script>
import Task from "./components/Task.svelte";
</script>

<main class="min-h-screen pt-4 md:pt-4 pb-2 px-4 md:px-0 body-bg-dark">
  <header class="max-w-lg mx-auto flex flex-row pr-3 pl-3 pt-2 pb-1">
    <h1 class="text-2xl font-bold text-white flex-1">To-Do App</h1>
    <button type="button" class="inline-block rounded border-2 bg-slate-800 border-gray-700 text-white leading-normal uppercase shadow-md hover:bg-slate-800 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg ease-in-out w-9 h-9 !outline-none"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 mr-2" style="margin: auto;">
      <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" class="stroke-white dark:stroke-white"></path>
      <path d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12
			20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836" class="stroke-white dark:stroke-white"></path>
    </svg></button>
  </header>

  <div class="max-w-lg mx-auto p-3 md:p-3 my-4 rounded-lg shadow-2xl bg-slate-900">
    <section>
      <div class="flex justify-center">
        <div class="mb-0 w-full">
          <input type="text" class="form-control block w-full px-3 py-1.5 text-base font-normal bg-clip-padding border border-solid rounded ease-in-out m-0 focus:border-blue-600 focus:outline-none bg-slate-600 focus:bg-slate-700 text-white focus:text-gray-200 border-slate-500" id="exampleFormControlInput1" placeholder="Enter a task">
        </div>
        <div class="flex space-x-2 justify-center pl-1">
          <button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out !outline-none">
            Add
          </button>
        </div>
      </div>

      <section id="task-list">
        <Task text="Task 1"></Task>
        <Task text="Task 2" isCompleted={true}></Task>
        <Task text="Task 3"></Task></section>
    </section>
  </div>

</main>
