function generateSummary({

healthScore,

totalInfrastructure,

totalIssues,

recommendations,

}){

let summary="";

if(healthScore>=90){

summary+="Overall city health is excellent. ";

}

else if(healthScore>=75){

summary+="Overall city health is stable with moderate improvements required. ";

}

else{

summary+="Critical infrastructure improvements are required. ";

}

summary+=`${totalInfrastructure} infrastructure assets are being monitored. `;

summary+=`${totalIssues} citizen issues are currently registered. `;

summary+=`${recommendations.length} AI recommendations have been generated.`;

return summary;

}

module.exports={

generateSummary,

};