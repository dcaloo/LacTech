const fallbackBancos = [
    { nome: 'São Paulo', lat: -23.5505, lng: -46.6333, endereco: 'São Paulo, SP', telefone: 'Não informado', site: '' },
    { nome: 'Barueri', lat: -23.5103, lng: -46.8761, endereco: 'Barueri, SP', telefone: 'Não informado', site: '' },
    { nome: 'Cajamar', lat: -23.3558, lng: -46.8778, endereco: 'Cajamar, SP', telefone: 'Não informado', site: '' },
    { nome: 'Cotia', lat: -23.6036, lng: -46.9190, endereco: 'Cotia, SP', telefone: 'Não informado', site: '' },
    { nome: 'Embu das Artes', lat: -23.6489, lng: -46.8522, endereco: 'Embu das Artes, SP', telefone: 'Não informado', site: '' },
    { nome: 'Ferraz de Vasconcelos', lat: -23.5413, lng: -46.3737, endereco: 'Ferraz de Vasconcelos, SP', telefone: 'Não informado', site: '' },
    { nome: 'Guarulhos', lat: -23.4555, lng: -46.5333, endereco: 'Guarulhos, SP', telefone: 'Não informado', site: '' },
    { nome: 'Itapevi', lat: -23.5487, lng: -46.9341, endereco: 'Itapevi, SP', telefone: 'Não informado', site: '' },
    { nome: 'Jandira', lat: -23.5271, lng: -46.9020, endereco: 'Jandira, SP', telefone: 'Não informado', site: '' },
    { nome: 'Osasco', lat: -23.5329, lng: -46.7927, endereco: 'Osasco, SP', telefone: 'Não informado', site: '' },
    { nome: 'Poá', lat: -23.5224, lng: -46.3439, endereco: 'Poá, SP', telefone: 'Não informado', site: '' },
    { nome: 'Rio Grande da Serra', lat: -23.7443, lng: -46.3957, endereco: 'Rio Grande da Serra, SP', telefone: 'Não informado', site: '' },
    { nome: 'Santo André', lat: -23.6542, lng: -46.5294, endereco: 'Santo André, SP', telefone: 'Não informado', site: '' },
    { nome: 'São Caetano do Sul', lat: -23.6249, lng: -46.5509, endereco: 'São Caetano do Sul, SP', telefone: 'Não informado', site: '' },
    { nome: 'Taboão da Serra', lat: -23.6093, lng: -46.7576, endereco: 'Taboão da Serra, SP', telefone: 'Não informado', site: '' },
    { nome: 'Arujá', lat: -23.3961, lng: -46.3186, endereco: 'Arujá, SP', telefone: 'Não informado', site: '' },
    { nome: 'Caieiras', lat: -23.3643, lng: -46.7470, endereco: 'Caieiras, SP', telefone: 'Não informado', site: '' },
    { nome: 'Carapicuíba', lat: -23.5149, lng: -46.8396, endereco: 'Carapicuíba, SP', telefone: 'Não informado', site: '' },
    { nome: 'Diadema', lat: -23.6864, lng: -46.6226, endereco: 'Diadema, SP', telefone: 'Não informado', site: '' },
    { nome: 'Embu-Guaçu', lat: -23.8305, lng: -46.8213, endereco: 'Embu-Guaçu, SP', telefone: 'Não informado', site: '' },
    { nome: 'Francisco Morato', lat: -23.2849, lng: -46.7429, endereco: 'Francisco Morato, SP', telefone: 'Não informado', site: '' },
    { nome: 'Itapecerica da Serra', lat: -23.7135, lng: -46.8543, endereco: 'Itapecerica da Serra, SP', telefone: 'Não informado', site: '' },
    { nome: 'Itaquaquecetuba', lat: -23.4836, lng: -46.3466, endereco: 'Itaquaquecetuba, SP', telefone: 'Não informado', site: '' },
    { nome: 'Mauá', lat: -23.6675, lng: -46.4618, endereco: 'Mauá, SP', telefone: 'Não informado', site: '' },
    { nome: 'Pirapora do Bom Jesus', lat: -23.4481, lng: -46.3794, endereco: 'Pirapora do Bom Jesus, SP', telefone: 'Não informado', site: '' },
    { nome: 'Ribeirão Pires', lat: -23.7116, lng: -46.4135, endereco: 'Ribeirão Pires, SP', telefone: 'Não informado', site: '' },
    { nome: 'Santana de Parnaíba', lat: -23.4449, lng: -46.9250, endereco: 'Santana de Parnaíba, SP', telefone: 'Não informado', site: '' },
    { nome: 'São Bernardo do Campo', lat: -23.6933, lng: -46.5646, endereco: 'São Bernardo do Campo, SP', telefone: 'Não informado', site: '' },
    { nome: 'Suzano', lat: -23.5429, lng: -46.3103, endereco: 'Suzano, SP', telefone: 'Não informado', site: '' },
    { nome: 'Vargem Grande Paulista', lat: -23.5997, lng: -46.9830, endereco: 'Vargem Grande Paulista, SP', telefone: 'Não informado', site: '' }
];

const map = L.map('map').setView([-23.5505, -46.6333], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

let bancosDeLeite = [];

async function carregarBancos() {
    try {
        const response = await fetch('bancos.json');
        if (!response.ok) throw new Error('Arquivo JSON indisponível');
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
            return data;
        }
    } catch (error) {
        console.warn('Usando lista local de cidades como fallback:', error);
    }

    return fallbackBancos;
}

carregarBancos().then(data => {
    bancosDeLeite = data;
    bancosDeLeite.forEach(banco => {
        banco.marker = L.marker([banco.lat, banco.lng]).addTo(map);
        banco.marker.bindPopup(`<b>${banco.nome}</b><br>${banco.endereco}`);
    });

    document.querySelectorAll('.legenda-item').forEach(item => {
        item.addEventListener('click', () => {
            const nome = item.dataset.nome;
            const lat = parseFloat(item.dataset.lat);
            const lng = parseFloat(item.dataset.lng);

            if (Number.isNaN(lat) || Number.isNaN(lng)) return;

            const cidade = bancosDeLeite.find(banco => banco.nome.toLowerCase() === nome.toLowerCase());
            map.setView([lat, lng], 11);

            if (cidade && cidade.marker) {
                cidade.marker.openPopup();
            }

            const mapaSection = document.getElementById('map');
            if (mapaSection) {
                mapaSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
}).catch(err => console.error('Erro no carregamento:', err));

    function calcularDistancia(lat1, lon1, lat2, lon2) {
        const R = 6371; // Raio da Terra em km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                    Math.sin(dLon/2) * Math.sin(dLon/2);
        return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
    }

    document.getElementById('btnConcluir').addEventListener('click', async () => {
        const cepInput = document.getElementById('cepInput').value.replace(/\D/g, '');
        const infoBox = document.getElementById('infoBancoConteudo');

        if(cepInput.length !== 8) {
            alert('Por favor, insira um CEP válido.');
            return;
        }
        infoBox.innerHTML = `<p>Buscando localização...</p>`;

        try {
            const respCep = await fetch(`https://viacep.com.br/ws/${cepInput}/json/`);
            const dadosCep = await respCep.json();

            if(dadosCep.erro) {
                infoBox.innerHTML = `<p style="color: red;">CEP não encontrado.</p>`;
                return;
            }

            const enderecoCompleta = `${dadosCep.logradouro}, ${dadosCep.localidade}, ${dadosCep.uf}, Brazil`;
            const respGeo = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(enderecoCompleta)}`);
            const dadosGeo = await respGeo.json();

            if (!dadosGeo || dadosGeo.length === 0) {
                infoBox.innerHTML = `<p style="color: red;">Não foi possível determinar a localização a partir do CEP.</p>`;
                return;
            }

            const usuarioLat = parseFloat(dadosGeo[0].lat);
            const usuarioLng = parseFloat(dadosGeo[0].lon);

            let maisProximo = null;
            let menorDistancia = Infinity;

            bancosDeLeite.forEach(banco => {
                const dist = calcularDistancia(usuarioLat, usuarioLng, banco.lat, banco.lng);
                if (dist < menorDistancia) {
                    menorDistancia = dist;
                    maisProximo = banco;
                }
            });

            if(maisProximo) {
                const telefone = maisProximo.telefone && maisProximo.telefone !== 'Não informado' ? `
                <p class="banco-tel">Tel.: ${maisProximo.telefone}</p>` : '';
                const site = maisProximo.site ? `<p><a href="https://${maisProximo.site}" target="_blank">${maisProximo.site}</a></p>` : '';

                infoBox.innerHTML = `<p class="banco-nome">${maisProximo.nome}</p>
                <p>${maisProximo.endereco}</p>
                ${telefone}
                ${site}
                `;

                map.setView([maisProximo.lat, maisProximo.lng], 12);
                maisProximo.marker.openPopup();
            }
        } catch (erro) {
            console.error(erro);
            infoBox.innerHTML = `<p style="color: red;">Ocorreu um erro ao buscar a localização. Tente novamente mais tarde.</p>`;
        }
    });