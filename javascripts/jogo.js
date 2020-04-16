const imgs = new Image();
imgs.src = "./assets/sprites.png"

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
    atualizar() {
        this.velocidade = this.velocidade + this.gravidade
        this.canvasY = this.canvasY + this.velocidade
    },
    desenhar() {

        desenhaObjeto(this.origemLargura, this.origemAltura, this.larguraCorte, this.AlturaCorte,this.canvasX, 
            this.canvasY,this.larguraImg, this.alturaImg
        );
    }
}

function carregaTela() {

    telaFundo.desenhar()
    chao.desenhar()
    bird.desenhar();
    bird.atualizar();

    
    requestAnimationFrame(carregaTela);
}

carregaTela();