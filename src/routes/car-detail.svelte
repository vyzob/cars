{#if carDetail}
    <dl class="data-list">
        <dt>Brand:</dt>&nbsp;<dd>{carDetail.brand}</dd><br>
        <dt>Type:</dt>&nbsp;<dd>{carDetail.type}</dd><br>
        <dt>Year:</dt>&nbsp;<dd>{carDetail.year}</dd>
    </dl>
{/if}




<style lang="scss">
    .data-list {
        display: inline-block;
        padding: 10px;
        border: 2px solid #ccc;
        border-radius: 5px;
        color: #666;
        dt {
            font-weight: bold;
        }

    }

</style>

<script lang="ts">
    import type { carType } from '../types/car.type';
    import { carStore } from '../carStore';
    import { page } from "$app/stores";

    let carDetail: carType | undefined;
    let hash: string = '';

    page.subscribe(pag => {
        if(
            pag.url.hash != hash
        ) {
            hash = pag.url.hash;
            update(hash);
        }
    })

    function update(hash: string) {
        let uuid = (hash[0] == '#') ? hash.slice(1) : hash;

        if (uuid && uuid.length) {
            carDetail = carStore.getDetail(uuid);
        } else {
            carDetail = undefined;
        }  
    }

    carStore.carsStore.subscribe(value => {
        update(hash);
    })

</script>