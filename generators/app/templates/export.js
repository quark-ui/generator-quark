/**
 * QUARK-UI Components
 * @author ryan.bian
 */
<% for(var i = 0; i < exportComponents.length; i++) {%>
export { default as <%= exportComponents[i].componentName %> } from './components/<%= exportComponents[i].dir %>/';
<% } %>
