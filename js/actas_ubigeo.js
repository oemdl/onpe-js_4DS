let ambito = ''
const getDepartamentos = async(ubigeo)=> {
    ambito = ubigeo
    const data = await fetch(`https://oaemdl.es/onpe_sweb_php/actas/ubigeo/${ambito}`)
    if (data.status == 200) {
        const departamentos = await data.json()
        let html = `
            <select name="cdgoDep" id="cdgoDep" class="form-control" onchange="getProvincias(this.value);">
                <option selected="selected" value="">--SELECCIONE--</option>`
        departamentos.forEach(departamento => {
            html += `<option value="${departamento.Detalle}">${departamento.Detalle}</option>`
        });
        html += '</select>'
        document.getElementById('departamentos').innerHTML = html

        document.getElementById('provincias').innerHTML = `
            <select name="cdgoProv" id="cdgoProv" class="form-control" onchange="getDistritos(this.value);" disabled>
                <option selected="selected" value="">--SELECCIONE--</option>
            </select>`
    }
}

const getProvincias = async(departamento)=>{
    const data = await fetch(`https://oaemdl.es/onpe_sweb_php/actas/ubigeo/${ambito}/${departamento}`)
    if (data.status == 200) {
        const provincias = await data.json()
        let html = `
            <select name="cdgoProv" id="cdgoProv" class="form-control" onchange="getDistritos(this.value);">
                <option selected="selected" value="">--SELECCIONE--</option>`
        provincias.forEach(provincia => {
            html += `<option value="${provincia.Detalle}">${provincia.Detalle}</option>`
        });
        html += '</select>'
        document.getElementById('provincias').innerHTML = html
    }
}