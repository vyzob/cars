<h4>{title}</h4>
<form>
    <input type="text" placeholder="Brand" bind:value={$brand.value} use:style={{ field: brand, valid: "form__input--valid", invalid: "form__input--invalid" }}>
    <input type="text" placeholder="Type" bind:value={$type.value} use:style={{ field: type, valid: "form__input--valid", invalid: "form__input--invalid" }}>
    <input type="number" min="1900" placeholder="Year(1900-current)" bind:value={$year.value} use:style={{ field: year, valid: "form__input--valid", invalid: "form__input--invalid" }}>

    {#if
        $brand.valid && $brand.dirty
        && $type.valid && $type.dirty
        && $year.valid
    }
        <button on:click|preventDefault={submitForm}>clickMe</button>
    {/if}

</form>

<style lang="scss">
    :global {
        .form {
            &__input {
                &--invalid {
                    color: red;
                }
                &--valid {
                    color: green;
                }
            }
        }
        
    }

</style>

<script lang="ts">
    import { form, field, style } from 'svelte-forms';
    import { required, between, } from 'svelte-forms/validators';
    import { get } from 'svelte/store';
    import { carStore } from '../carStore';
    import type {carType } from '../types/car.type';

    const brand = field('brand', '', [required()]);
    const type = field('type', '', [required()]);
    const year = field('year', 1900, [required(), between(1900, new Date().getFullYear())]);

    const carForm = form(brand, type, year);

    let uuidForUpdate: string | undefined;
    let title = 'Add new car';

    carStore.editUuid.subscribe(value => {
        uuidForUpdate = value;

        if (value) {
            const carData = carStore.getDetail(value);
            
            if(carData) {
                title = `Editing car ${value}`;
                brand.set(carData.brand);
                type.set(carData.type);
                year.set(carData.year);
            }
        } else {
            carForm.reset();
            title = 'Add new car';
        }
    })

    function submitForm() {
        const carData: carType = {
            brand: get(carForm.getField('brand')).value,
            type: get(carForm.getField('type')).value,
            year: get(carForm.getField('year')).value,
            uuid: uuidForUpdate || self.crypto.randomUUID()
        };

        if (uuidForUpdate) {
            carStore.putCar(carData);
        } else {
            carStore.postCar(carData);
        }

        carForm.reset();
    }
</script>