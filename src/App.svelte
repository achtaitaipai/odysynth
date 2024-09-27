<script lang="ts">
  import { onMount } from "svelte";
  import { play } from "./lib/audio/index.js";
  import Fields from "./lib/components/Fields.svelte";
  import {
    getParametersFromString,
    initialParameters,
  } from "./lib/parameters.js";
  import { fart, fall, jump, laser, pickup, powerUp, initial, random } from "./lib/templates/index.js";

  const audioContext = new AudioContext();
  let parameters = { ...initialParameters };

  const playSound = () => play(audioContext, { ...parameters });

  const updateUrl = () => {
    const params = encodeURI(Object.values(parameters).join(","));
    const url = new URL(location.href);
    const searchParams = url.searchParams;
    searchParams.set("q", params);
    history.pushState({}, "", url);
  };

  const handleChange = () => {
    playSound();
    updateUrl();
  };

  onMount(() => {
    const url = new URL(location.href);
    const q = url.searchParams.get("q");
    if (!q) return;
    const urlParameters = getParametersFromString(q);
    parameters = urlParameters;
  });
</script>

<main class="container">
  <article>
    <form on:change={handleChange}>
      <div class="controls">
        <div>
          <button on:click={playSound} type="button" class="play">Play</button>
        </div>
        <button
          on:click={() => {
            parameters = {...initial()};
            handleChange();
          }}
          type="button">DEFAULT</button
        >
        <button
          on:click={() => {
            parameters = {...pickup()};
            handleChange();
          }}
          type="button">PICKUP</button
        >
        <button
          on:click={() => {
            parameters = {...laser()};
            handleChange();
          }}
          type="button">LASER</button
        >
        <button
          on:click={() => {
            parameters = {...jump()};
            handleChange();
          }}
          type="button">JUMP</button
        >
        <button
          on:click={() => {
            parameters = {...fall()};
            handleChange();
          }}
          type="button">FALL</button
        >
        <button
          on:click={() => {
            parameters = {...powerUp()};
            handleChange();
          }}
          type="button">POWERUP</button
        >
        <button
          on:click={() => {
            parameters = {...fart()};
            handleChange();
          }}
          type="button">FART</button
        >
        <button
          on:click={() => {
            parameters = {...random()};
            handleChange();
          }}
          type="button">RANDOM</button
        >
      </div>
      <Fields bind:state={parameters} />
    </form>
  </article>
</main>

<style>
  .controls {
    position: sticky;
    top: 1rem;
    z-index: 10;
  }
</style>
