/* Shared case defaults: use these team names for every current and future case. */
(() => {
  const teams=Object.freeze(['Team Alpha','Team Bravo','Team Charlie']);
  const aliases=[['Authentication Team','Wireless Analysis Team','Analyst Alpha'],['Activity Team','Threat Analysis Team','Analyst Bravo'],['Threat Hunt Team','Risk & Controls Team','Analyst Charlie']];
  const normalizeTeam=name=>teams.includes(name)?name:teams[Math.max(0,aliases.findIndex(group=>group.includes(name)))];
  // Fisher–Yates: shuffle copies, retaining the original choice IDs.
  const shuffle=(items,random=Math.random)=>{const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]]}return result};
  window.IRONCREST_CONFIG=Object.freeze({teams,normalizeTeam,shuffle});
})();
