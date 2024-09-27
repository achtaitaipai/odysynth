<script lang="ts">
  import { parameters, type ParametersState } from "../../lib/parameters";
  import { camelCaseToTitleCase } from "../string.js";
  export let state: ParametersState;
</script>

{#each parameters as { group, fields }}
  <fieldset>
    <legend><strong>{camelCaseToTitleCase(group)}</strong></legend>
    <div class="two-cols">
      {#each fields as field}
        {#if field.type === "range"}
          {@const { name, min, max, step } = field}
          <div>
            <label for="{group}-{name}">
              {camelCaseToTitleCase(name)}
            </label>
            {state[name]}
            <input
              type="range"
              {min}
              {max}
              {step}
              bind:value={state[name]}
              name="{group}-{name}"
              id="{group}-{name}"
            />
          </div>
        {:else if field.type === "radio"}
          {@const { name, options } = field}
          {#each options as { label, value }}
            <label >
              <input
                type="radio"
                {name}
                {value}
                bind:group={state[name]}
              />
              {label}</label
            >
          {/each}
        {/if}
      {/each}
    </div>
  </fieldset>
{/each}

<style>
  .two-cols {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
</style>
