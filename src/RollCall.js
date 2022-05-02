import { LitElement, html, css, render } from 'lit';
import '@lrnwebcomponents/rpg-character/rpg-character.js';

export class RollCall extends LitElement {
    static get tag() {
        return 'roll-call'
    }
    
    static get properties() {
        return {

            userObj: { type: Object },
            users: { type: Array },
            timestamp: { type: Number},
            customHash: { type: String, reflect: true },
        }
    }

    constructor() {
        super();
        this.users =[];
        this.userObj;

        this.lastAccessedUnmodded = new Date();
        this.lastAccessed = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
        this.customHash;
    }

    seedEncode(str1, str2) {
        let ip = str1;
        let birthday = str2.substring(14,19);
        let lasttwo = str1.substring(10,12) + str2.substring(17,19);
        let seed = BigInt(1);
    
        for (let i=0; i< ip.length; i++) {
          //console.log(basicip.charCodeAt(i));
          for (let j=0; j< birthday.length; j++) {
            if (i<64) {
              seed = BigInt(seed) * BigInt(ip.charCodeAt(i));
            }
            if (j<34) {
              seed = BigInt(seed) + BigInt(birthday.charCodeAt(j));
            }
          }
          seed = BigInt(seed)-BigInt(lasttwo);
    
        }
        seed = BigInt(seed).toString();
        return seed.substring(str1.substring(11,12),32);
      }

    render() {
		return html`
			<p>
            <rpg-character class = "rpg" seed = test></rpg-character>
			</p>
		`
	}
}

window.customElements.define(RollCall.tag, RollCall);