<template>
    <pre><code v-html="prettyData"/></pre>
</template>

scrip <script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: ['data'],
    methods: {
        prettify(value:object){
            var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
            var replacer = function(match:any, pIndent:any, pKey:any, pVal:any, pEnd:any) {
                var key = '<span class="json-key" style="color: brown">',
                    val = '<span class="json-value" style="color: navy">',
                    str = '<span class="json-string" style="color: olive">',
                    r = pIndent || '';
                if (pKey)
                    r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
                if (pVal)
                    r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
                return r + (pEnd || '');
            };

            return JSON.stringify(value, null, 4)
                    .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
                    .replace(/</g, '&lt;').replace(/>/g, '&gt;')
                    .replace(jsonLine, replacer);
        }
    },
    computed: {
        prettyData() {
            return this.prettify(this.data)
        }
    },
})
</script>

<style>
body{
    background: #efefef;
}
pre {
    background-color: ghostwhite;
    border: 1px solid silver;
    padding: 10px 20px;
    margin: 20px;
    border-radius: 4px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}
</style>
