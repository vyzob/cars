<CreateCarComponent></CreateCarComponent>
<main class="main">
    <section class="main__detail">
        <CarDetailComponent></CarDetailComponent>
    </section>
    <section class="main__list">
        <CarListComponent></CarListComponent>
        
    </section>
    
    
</main>


<style lang="scss">
    :global {
        body {
            color: #1e1e1e;
            font-family: Verdana, sans-serif;
            font-size: 16px;
        }
        table {
            border-collapse: collapse;
            margin: 0;
        }
        dl {
            margin: 0;
        }
    }
    main {
        margin-top: 30px;
        padding-top: 30px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        border-top: 2px solid #8d8d8d;
        &__list {
            flex-grow: 2;
        }
    }
</style>

<script lang="ts">
    import CreateCarComponent from './create-car.svelte';
    import CarListComponent from './car-list.svelte';
    import CarDetailComponent from './car-detail.svelte';



</script>
