const imgs = new Image();
imgs.src = "./assets/sprites.png"

const som_HIT = new Audio();
som_HIT.src = "./assets/efeitos/hit.wav"

const som_PULO = new Audio();
som_PULO.src = "./assets/efeitos/pulo.wav"

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

function desenhaObjeto(origemLargura, origemAltura, larguraCorte, AlturaCorte, canvasX, canvasY, larguraImg, alturaImg, adicionaAMais) {
   
    if (!adicionaAMais) {

        ctx.drawImage(
            imgs,
            origemLargura, origemAltura,
            larguraCorte, AlturaCorte,
            canvasX , canvasY,
            larguraImg, alturaImg 
        );

    } else {
        ctx.drawImage(
            imgs,
            origemLargura, origemAltura,
            larguraCorte, AlturaCorte,
            (canvasX + larguraCorte) * adicionaAMais, canvasY,
            larguraImg, alturaImg 
        );
    }
}

function fazColisao(bird, chao) {
    const birdY = bird.canvasY + bird.alturaImg;
    const chaoY = chao.canvasY;

    if (birdY >= chaoY) return true

    return false;
}

const telaFundo = {
    imagem: imgs,
    origemLargura: 390,
    origemAltura: 0,
    larguraCorte: 275,
    AlturaCorte: 202,
    canvasX: 0,
    canvasY: canvas.height - 311,
    larguraImg: 275,
    alturaImg: 202,
    desenhar() {

        ctx.fillStyle = '#70c5ce';
        ctx.fillRect(0,0, canvas.width, canvas.height)
        
        const repitirImg = canvas.width / this.larguraCorte;
        for (let i = 0; i <= Math.floor(repitirImg); i++) {
            
            desenhaObjeto(this.origemLargura, this.origemAltura, this.larguraCorte, this.AlturaCorte,this.canvasX, 
                this.canvasY,this.larguraImg, this.alturaImg, i
            );
        }
    }
}

const chao = {
    imagem: imgs,
    origemLargura: 0,
    origemAltura: 610,
    larguraCorte: 224,
    AlturaCorte: 112,
    canvasX: 0,
    canvasY: canvas.height - 112,
    larguraImg: 225,
    alturaImg: 112,
    desenhar() {
        
        const repitirImg = canvas.width / this.larguraCorte;
        for (let i = 0; i <= Math.floor(repitirImg); i++) {
            
            desenhaObjeto(this.origemLargura, this.origemAltura, this.larguraCorte, this.AlturaCorte,this.canvasX, 
                this.canvasY,this.larguraImg, this.alturaImg, i
            );
        }
    }
}

const getReady = {
    imagem: imgs,
    origemLargura: 133,
    origemAltura: 0,
    larguraCorte: 174,
    AlturaCorte: 152,
    canvasX: (canvas.width /2) - 174 / 2, //600 
    canvasY: 98,
    larguraImg: 174,
    alturaImg: 152,
    desenhar() {
       
        desenhaObjeto(this.origemLargura, this.origemAltura, this.larguraCorte, this.AlturaCorte,this.canvasX, 
            this.canvasY,this.larguraImg, this.alturaImg
        );
    }
}

const bird = {
    imagem: imgs,
    origemLargura: 0,
    origemAltura: 0,
    larguraCorte: 35,
    AlturaCorte: 25,
    canvasX: 80,
    canvasY: 50,
    larguraImg: 50,
    alturaImg: 40,
    gravidade: 0.25,
    velocidade: 1,
    pulo: 4.6,
    pular() {
        som_PULO.play();
        this.velocidade =  - this.pulo;
    },
    atualizar() {
        if(fazColisao(this, chao)) {
            som_HIT.play();
            mudaTela(telas.inicio)
            return
        }

        this.velocidade = this.velocidade + this.gravidade
        this.canvasY = this.canvasY + this.velocidade
    },
    desenhar() {

        desenhaObjeto(this.origemLargura, this.origemAltura, this.larguraCorte, this.AlturaCorte,this.canvasX, 
            this.canvasY,this.larguraImg, this.alturaImg
        );
    },
    resetarValores() {
        this.gravidade =  0.25;
        this.velocidade =  1;
        this.pulo =  4.6;
        this.canvasX =  80;
        this.canvasY =  50;
    }
}

let telaAtiva = {};
function mudaTela(novaTela) {
    telaAtiva = novaTela;
}

const telas = {
    inicio: {
        desenhar() {
            telaFundo.desenhar()
            chao.desenhar()
            bird.desenhar();
            getReady.desenhar();
        },
        atualizar() {

        },
        click() {
            bird.resetarValores();
            mudaTela(telas.jogo)
        }
    },
    jogo: {
        desenhar() {
            telaFundo.desenhar()
            chao.desenhar()
            bird.desenhar();
        },
        atualizar() {
            bird.atualizar();
        },
        click() {
            bird.pular();
        }
    }
}

function carregaTela() {

    telaAtiva.desenhar();
    telaAtiva.atualizar();
    requestAnimationFrame(carregaTela);
}

window.addEventListener("click", () => {

    if(telaAtiva.click()) {
        telaAtiva.click();
    }
})

mudaTela(telas.inicio);
carregaTela();