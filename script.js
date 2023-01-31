
//=================================
// todas as variavies aqui.
//=================================
var l00,l11,l22,v00,v11;

var EM0 = 9.1091e-28;
var EMB = 0.067*EM0;
var EP0 = 12.9;
var PI  = Math.PI;
var HB  = 1.0545e-27;
var EC  = 4.8029e-10;

var AB   = (HB*HB*EP0)/(EMB*EC*EC);
var RY   = (EC*EC)/(2*EP0*AB);
var ONEA = 1.0E-8;
var ABA  = (AB)/(ONEA);

var ONEMEV = 1.6021e-15;
var RYMEV  = (RY)/(ONEMEV);

//================================
//       Declarar Parametros.
//================================
v00 = 250;
v11 = 250;
l00 = 45  ;          //        Barreira
l11 = 100;           //        Poço Esquerda

//================================
//       Admensionalisando
//================================
var v0 = v00/RYMEV;
var v1 = v11/RYMEV;
var l0 = l00/ABA;
var l1 = l11/ABA;
var enp = [];
var t   = [];
var comp =[];
var cor = [];
var x1 = new Array( 5 );
var x2 = new Array( 5 );
var n  = new Array( 5 );
var xf = new Array( 5 );
var output = new Array();
var d     = 2000;   //  *** NCS ***
var tol   = 1.0e-18;   //  *** NCS ***
var passo = 1/(d);   //  *** NCS ***
var l22, l2 , j , jf
var go = false;


//==================================
// Cores definidas para cada estado.
//==================================

cor[1]	=	"#000000"
cor[2]	=	"#1f77b4"
cor[3]	=	"#ff7f0e"	
cor[4]	=	"#2ca02c"
cor[5]	=	"#d62728"
cor[6]	=	"#9467bd"
cor[7]	=	"#8c564b"
cor[8]	=	"#e377c2"
cor[9]	=	"#7f7f7f"
cor[10]	=	"#bcbd22"
cor[11]	=	"#17becf"
cor[12] =	"#aec7e8"

//================================
// transformação de coordenada.
//================================
function fixCoords(lctx,cw,ch,xmin,xmax,ymin,ymax){	
  var m11 = cw/(xmax-xmin);
  var m12 = 0;
  var m21 = 0;
  var m22 = ch/(ymin-ymax);
  var dx = - cw*xmin/(xmax-xmin);
  var dy = - ch*ymax/(ymin-ymax);
  lctx.transform(m11,m12,m21,m22,dx,dy);
  var esp = Math.max(m11,m22);
  lctx.lineWidth = 1/esp;
}

// Canvas das auto-energias.
//===============================================================
var context = document.getElementById("cHor").getContext('2d');
  fixCoords(context,600,400,-(l1 + l0),4+l0,0,v0+5);
//===============================================================

// Canvas da energia.
//===============================================================
var contexte = document.getElementById("cHore").getContext('2d');
  fixCoords(contexte,400,400,0,4,0,v0+5);
//===============================================================
  
// Cancas da função de onda.
//===============================================================
var contextw = document.getElementById("cHorw").getContext('2d');
  fixCoords(contextw,1200,400,-(l1 + l0),4+l0,0,3);
//===============================================================
  
//================================
// transformação de coordenada.
//================================

var jm = 0 
if ( go ){
	var tictac = setInterval("desenha()",50);
}


function mudaEstado() {
  if (go) {go = false;}
  else {go = true;
  tictac = setInterval("desenha()",50);}
}

function desenha() {
//=================================
// Inicio do programa.
//=================================
  l22 = jm;
  if ( l22 > 300){
	go = false;
  }
  l2  = (l22)/(ABA);
  comp[0] = 0
  comp[jm+1] = l2 
  j = 1;

//=======================
// Canvas auto-energias.
//=======================
context.beginPath();
context.clearRect(-3,0,1000,400);
context.stroke();

context.beginPath();
context.strokeStyle = "black";
context.moveTo(-2*(l1 + l0),v0);
context.lineTo(-l1,v0);

context.moveTo(-l1,v0);
context.lineTo(-l1,0);

context.moveTo(-l1,0);
context.lineTo(0,0);

context.moveTo(0,0);
context.lineTo(0,v0);

context.moveTo(0,v0);
context.lineTo(l0,v0);

context.moveTo(l0,v0);
context.lineTo(l0,0);
  
context.stroke();
context.moveTo(l0,0);
context.lineTo(l0+l2,0);

context.moveTo(l0+l2,0);
context.lineTo(l0+l2,v0);


context.stroke();

//=======================
// Canvas função de onda.
//=======================

contextw.beginPath();
contextw.clearRect(-3,-1.5,1600,400);
contextw.stroke();

contextw.beginPath();
contextw.strokeStyle = "black";
contextw.moveTo(-2*(l1 + l0),2);
contextw.lineTo(-l1,2);

contextw.moveTo(-l1,2);
contextw.lineTo(-l1,0);

contextw.moveTo(-l1,0);
contextw.lineTo(0,0);

contextw.moveTo(0,0);
contextw.lineTo(0,2);

contextw.moveTo(0,2);
contextw.lineTo(l0,2);

contextw.moveTo(l0,2);
contextw.lineTo(l0,0);
  
contextw.stroke();
contextw.moveTo(l0,0);
contextw.lineTo(l0+l2,0);

contextw.moveTo(l0+l2,0);
contextw.lineTo(l0+l2,2);


contextw.stroke();

//================================
// desenha no canvas.
//================================
for( var i = 0 ; i < (d*v0 - 0.0001) ; i++){
	var a = (i)/(d);
      	var b = (i)/(d) + passo;
      	var f1 = funp(a);
      	var f2 = funp(b);
		if( f1*f2 <= 0 ){
	  		enp[j] = zbrent(a , b);  //  *** NCS ***
	  		j++;
        	}
}

jf = j - 1;

for( var t = 0 ; t < j ; t++){
	contexte.strokeStyle = cor[t+1];
        contexte.beginPath();
	contexte.arc(comp[jm] , enp[t+1] , 0.02 , 0 , 2*Math.PI );
        contexte.stroke();
}

grade();
jm++;
if (!go) clearInterval(tictac);

}

//================================    
// calcula as energias possiveis.
//================================
function funp(e){
	var k1 = Math.sqrt(v0 - e);
	var k2 = Math.sqrt(e);
	var k3 = Math.sqrt(v1 - e);

	var m = l0 + l1;
	var n = m + l2;

	var w1 = (k2)  / (Math.cos(k2*l1));
        var w2 = (-k2)*(Math.tan(k2*l1))*(Math.exp(k1*l1)) - k1*(Math.exp(k1*l1));
	var w3 = (-k2)*(Math.tan(k2*l1))*(Math.exp(-k3*l1)) + k3*(Math.exp(-k3*l1));
	var w4 = (-k1)*(Math.exp(-k3*m)) - k3*(Math.exp(-k3*m));
	var w5 = (k1)*(Math.cos(k2*m)) + k2*(Math.sin(k2*m));
	var w6 = (k1)*(Math.sin(k2*m)) - k2*(Math.cos(k2*m));
	var w7 = (k2)/(Math.cos(k2*n));
	var w8 = (-k2)*(Math.exp(-k3*n))*(Math.tan(k2*n)) + k3*(Math.exp(-k3*n));
	var w9 = (k2)*(Math.cos(k2*l1))/(k1) + (Math.sin(k2*l1));

	var w10 = (w1)*(Math.exp(k1*l1))/(w9) + w2;
	var w11 = (w1)*(Math.exp(-k3*l1))/(w9) + w3;
	var w12 = (-w11)*(Math.exp(k1*m))/(w10) + Math.exp(-k3*m);
	var w13 = (w4)*(Math.cos(k2*m))/(w12) + (w5);
	var w14 = (w4)*(Math.sin(k2*m))/(w12) + (w6);
	var w15 = ((-Math.cos(k2*n))*w14)/(w13) + (Math.sin(k2*n));
	var w16 = (w7)*(Math.exp(-k3*n))/(w15) + (w8);

        return  k1*w9*w10*w12*w13*w15*w16;
}

//================================
// metodo de variação para funp
//================================
function zbrent(a , b){
	var fa = funp(a);
	var fb = funp(b);
	var fc , c , e , d , s , p , q , r;
	var tol   = 1.0e-18;

	if ( fa*fb < 0) {
		fc = fb;
		for( var i = 1 ; i <= 1000 ; i++ ){
	    	if( fb * fc > 0 ){
				c  = a;
				fc = fa;
				d  = b - a;
				e  = d;
			}
			if( Math.abs(fc) < Math.abs(fb) ){
				a = b;
				b = c;
				c = a;
				fa = fb;
				fb = fc;
				fc = fa;
			}

			var tol1 = 2*1e-10*Math.abs(b) + 0.5*tol;
			var xm   = 0.5*(c-b);

			if ((Math.abs(xm) <= tol1) || (fb == 0)){   //  *** NCS ***
				return b;   //  *** NCS ***
			}

			if((Math.abs(e) >= tol1 && Math.abs(fa)) > (Math.abs(fb)) ){   //  *** NCS ***
				s = fb/fa;
				if(a == c){
					p = 2*xm*s;
					q = -s;
				}
				else {
					q = fa/fc;
					r = fb/fc;
					p = s*(2*xm*q*(q-r)-(b-a)*(r-1));
					q = ((q-1)*(r-1)*(s-1));
				}

				if( p > 0 ){
					q = -q;
					p = Math.abs(p);
					if( 2*p < Math.min(3*xm*q - Math.abs(tol1*q) , Math.abs(e*q))){
						e = d;
						d = p/q;
					}
					else {
						d = xm;
						e = d;
					}
				}
				else {
					d = xm;
					e = d;
				}
				a  = b;
				fa = fb;

				if( Math.abs(d) > tol1 ){
					b = b + d;
				}
				else {
					b = b + Math.abs(tol1)*( xm / Math.abs(xm) ) ;   //  *** NCS *** ESTA FUNCAO NAO EXISTE EM JS. O QUE DEVERIA FAZER?
				}
			fb = funp(b);
			}
		}
		return b   //  *** NCS ***
	}
}

//================================
// divisão da regiao do poço duplo
//================================
function grade(){

	x1[1] = -2*(l1 + l0);
	x2[1] = -l1;
	x1[2] = -l1;
	x2[2] = 0;
	x1[3] = 0;
	x2[3] = l0;
	x1[4] = l0;
	x2[4] = l0 + l2;
	x1[5] = l0 + l2;
	x2[5] = 2*(l0+l2);

	n[1] = 500;
	n[2] = 1000;
	n[3] = 1000;
	n[4] = 1000;
	n[5] = 500;

	for( var i = 1 ; i <= 5 ; i++){   //  *** NCS ***
		xf[i] = new Array(n[i]);
		for( var j = 1 ; j <= n[i] ; j++){
			xf[i][j] = x1[i] + j*Math.abs( x2[i] - x1[i] )/n[i];
		}
	}
	
	if((document.getElementById("escolhanivel").checked)){
	  draw(jf);
	  }
	else{
	  coefic(jf);
	  }
}

//========================================
// Acha os coeficientes da funcao de onda
//========================================
function coefic(jf){
		var am5 = new Array(jf);
		var am4 = new Array(jf);
		var am3 = new Array(jf);
		var am2 = new Array(jf);
		var am1 = new Array(jf);
		var bm4 = new Array(jf);
		var bm3 = new Array(jf);
		var bm2 = new Array(jf);
	
	for( var i = 1 ; i <= jf ; i++){
	  var k1 = Math.sqrt( v0 - enp[i] );
		var k2 = Math.sqrt( enp[i] );
		var tk = k2/k1;
		var pk = k2/k1;
		var alfa = -k1*l1;
		var beta = k2*l1;
		var elta = k1*l0;
		var eps  = k2*l0;
		var delta = k2*(l0+l2);
		var gama  = -k1*(l0+l2);
		var x = (Math.sin(beta) + tk*Math.cos(beta))/(Math.cos(beta) - tk*Math.sin(beta));
		var y = (-Math.exp(elta)*(tk+x) + Math.exp(-elta)*(tk-x))/(tk-x);
		var z = (-Math.exp(elta)*(tk+x) - Math.exp(-elta)*(tk-x))/(tk-x);
	        var romega = (z*Math.sin(eps) - pk*y*Math.cos(eps))/(z*Math.cos(eps) + pk*y*Math.sin(eps));


		var a5 = 1;
		var b4 = (a5)*Math.exp(gama)/(-romega*Math.cos(delta) + Math.sin(delta));
		var a4 = -romega*b4;
		var b3 = (a4*(Math.cos(eps))/y) + (b4*(Math.sin(eps))/y);
		var a3 = b3*(-tk - x)/(tk - x);
		var b2 = ((a3/tk) - b3/tk);
		var a2 = (a3 + b3);
		var a1 = (Math.cos(beta))*(Math.exp(-alfa))*a2 - Math.sin(beta)*(Math.exp(-alfa))*b2;

		var c1 = -0.5*a1*a1*(-Math.exp(-2*k1*l1))/k1;

		var c5 = 0.5*a5*a5*(Math.exp(-2*k1*(l2+l0)))/k1;

		var c2 = (-a2*b2 + 0.5*a2*a2*Math.cos(k2*l1)*Math.sin(k2*l1) + 0.5*a2*a2*k2*l1 + a2*b2*Math.cos(k2*l1)*Math.cos(k2*l1) - 0.5*b2*b2*Math.cos(k2*l1)*Math.sin(k2*l1) + 0.5*b2*b2*k2*l1)/k2;

		var c3 = 0.5*(a3*a3*Math.pow(Math.exp(k1*l0),4) + 4*a3*b3*l0*k1*Math.exp(k1*l0)*Math.exp(k1*l0) - b3*b3 - a3*a3*Math.exp(k1*l0)*Math.exp(k1*l0) + Math.exp(k1*l0)*Math.exp(k1*l0)*b3*b3)/k1/(Math.exp(k1*l0)*Math.exp(k1*l0));

		var c4 = 0.5*(a4*a4*Math.cos(k2*(l2+l0))*Math.sin(k2*(l0+l2)) + a4*a4*k2*l2 - 2*a4*b4*Math.cos(k2*(l0+l2))*Math.cos(k2*(l0+l2)) - b4*b4*Math.cos(k2*(l0+l2))*Math.sin(k2*(l0+l2))+b4*b4*k2*l2 - a4*a4*Math.cos(k2*l0)*Math.sin(k2*l0) + 2*a4*b4*Math.cos(k2*l0)*Math.cos(k2*l0) + b4*b4*Math.cos(k2*l0)*Math.sin(k2*l0))/k2;

		var cn = 1 /Math.sqrt(+c1+c2+c3+c4+c5);
		var an5	=	cn*a5;
		var an4	=	cn*a4;
		var bn4	=	cn*b4;
		var bn3	=	cn*b3;
		var an3	=	cn*a3;
		var bn2	=	cn*b2;
		var an2	=	cn*a2;
		var an1	=	cn*a1;
		am5[i]	=	an5;
		am4[i]	=	an4;
		bm4[i]	=	bn4;
		bm3[i]	=	bn3;
		am3[i]	=	an3;
		bm2[i]	=	bn2;
		am2[i]	=	an2;
		am1[i]	=	an1;
	
	  wavefunc(i ,an1 ,an2 , bn2 , an3, bn3 ,bn4 , an4, an5 );
	}
}

//==================================================
// Calcula a função de onda com os coef normalizados
//==================================================
function wavefunc(i,a1,a2,b2,a3,b3,a4,b4,a5){
	var rk1 = new Array(jf);
	var rk2 = new Array(jf);
	var refi = new Array(jf);
	var nivel
	
	
	rk2[i] = Math.sqrt( enp[i] );
	rk1[i] = Math.sqrt( v0 - enp[i] );

	refi[i] = new Array(5)
	for (var l = 1 ; l <= 5 ; l++){   //  *** NCS ***

		refi[i][l] = new Array(n[l])
		for(var k = 1 ; k <= n[l] ; k++){

			if( l == 1 ){
				refi[i][1][k] = a1*Math.exp(rk1[i]*xf[l][k])
			}
			if( l == 2 ){
				refi[i][2][k] = a2*Math.cos(rk2[i]*xf[l][k]) + b2*Math.sin(rk2[i]*xf[l][k])
			}
			if( l == 3 ){
				refi[i][3][k] = a3*Math.exp(rk1[i]*xf[l][k]) + b3*Math.exp(-rk1[i]*xf[l][k])
			}
			if( l == 4 ){
				refi[i][4][k] = a4*Math.sin(rk2[i]*xf[l][k]) + b4*Math.cos(rk2[i]*xf[l][k])
			}
			if( l == 5 ){
				refi[i][5][k] = a5*Math.exp(-rk1[i]*xf[l][k]);   //  *** NCS ***
			}
		}
	}

	for( var l = 1 ; l <= 5 ; l++ ){
		for( var k = 1 ; k <= (n[l]-1) ; k++ ){
            
			context.fillStyle = cor[i];
			context.beginPath();
			context.rect(xf[l][k], enp[i], xf[l][k+1] - xf[l][k], 0.67);
			context.fill();
			
			contextw.strokeStyle = cor[i];
			contextw.beginPath();
			contextw.moveTo(xf[l][k] , refi[i][l][k]*refi[i][l][k]);
			contextw.lineTo(xf[l][k+1] , refi[i][l][k+1]*refi[i][l][k+1]);
			contextw.stroke();
		}

	}
}

function draw(jf){
	var i
 	var am5 = new Array(jf);
	var am4 = new Array(jf);
	var am3 = new Array(jf);
	var am2 = new Array(jf);
	var am1 = new Array(jf);
	var bm4 = new Array(jf);
	var bm3 = new Array(jf);
	var bm2 = new Array(jf);
	
	for( var nivel = 1 ; nivel <= jf  ; nivel++){
		if((document.getElementById(nivel).checked)){ i = nivel
        		var k1 = Math.sqrt( v0 - enp[i] );
			var k2 = Math.sqrt( enp[i] );
			var tk = k2/k1;
			var pk = k2/k1;
			var alfa = -k1*l1;
			var beta = k2*l1;
			var elta = k1*l0;
			var eps  = k2*l0;
			var delta = k2*(l0+l2);
			var gama  = -k1*(l0+l2);
			var x = (Math.sin(beta) + tk*Math.cos(beta))/(Math.cos(beta) - tk*Math.sin(beta));
			var y = (-Math.exp(elta)*(tk+x) + Math.exp(-elta)*(tk-x))/(tk-x);
			var z = (-Math.exp(elta)*(tk+x) - Math.exp(-elta)*(tk-x))/(tk-x);
		        var romega = (z*Math.sin(eps) - pk*y*Math.cos(eps))/(z*Math.cos(eps) + pk*y*Math.sin(eps));

			var a5 = 1;
			var b4 = (a5)*Math.exp(gama)/(-romega*Math.cos(delta) + Math.sin(delta));
			var a4 = -romega*b4;
			var b3 = (a4*(Math.cos(eps))/y) + (b4*(Math.sin(eps))/y);
			var a3 = b3*(-tk - x)/(tk - x);
			var b2 = ((a3/tk) - b3/tk);
			var a2 = (a3 + b3);
			var a1 = (Math.cos(beta))*(Math.exp(-alfa))*a2 - Math.sin(beta)*(Math.exp(-alfa))*b2;
	
			var c1 = -0.5*a1*a1*(-Math.exp(-2*k1*l1))/k1;
	
			var c5 = 0.5*a5*a5*(Math.exp(-2*k1*(l2+l0)))/k1;
	
			var c2 = (-a2*b2 + 0.5*a2*a2*Math.cos(k2*l1)*Math.sin(k2*l1) + 0.5*a2*a2*k2*l1 + a2*b2*Math.cos(k2*l1)*Math.cos(k2*l1) - 0.5*b2*b2*Math.cos(k2*l1)*Math.sin(k2*l1) + 0.5*b2*b2*k2*l1)/k2;

			var c3 = 0.5*(a3*a3*Math.pow(Math.exp(k1*l0),4) + 4*a3*b3*l0*k1*Math.exp(k1*l0)*Math.exp(k1*l0) - b3*b3 - a3*a3*Math.exp(k1*l0)*Math.exp(k1*l0) + Math.exp(k1*l0)*Math.exp(k1*l0)*b3*b3)/k1/(Math.exp(k1*l0)*Math.exp(k1*l0));
	
			var c4 = 0.5*(a4*a4*Math.cos(k2*(l2+l0))*Math.sin(k2*(l0+l2)) + a4*a4*k2*l2 - 2*a4*b4*Math.cos(k2*(l0+l2))*Math.cos(k2*(l0+l2)) - b4*b4*Math.cos(k2*(l0+l2))*Math.sin(k2*(l0+l2))+b4*b4*k2*l2 - a4*a4*Math.cos(k2*l0)*Math.sin(k2*l0) + 2*a4*b4*Math.cos(k2*l0)*Math.cos(k2*l0) + b4*b4*Math.cos(k2*l0)*Math.sin(k2*l0))/k2;

			var cn = 1 /Math.sqrt(+c1+c2+c3+c4+c5);
			var an5	=	cn*a5;
			var an4	=	cn*a4;
			var bn4	=	cn*b4;
			var bn3	=	cn*b3;
			var an3	=	cn*a3;
			var bn2	=	cn*b2;
			var an2	=	cn*a2;
			var an1	=	cn*a1;
			am5[i]	=	an5;
			am4[i]	=	an4;
			bm4[i]	=	bn4;
			bm3[i]	=	bn3;
			am3[i]	=	an3;
			bm2[i]	=	bn2;
			am2[i]	=	an2;
			am1[i]	=	an1;
	
			wavefunc(i ,an1 ,an2 , bn2 , an3, bn3 ,bn4 , an4, an5 );
		}
	}
}
