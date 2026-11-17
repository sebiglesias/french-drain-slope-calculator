
function init() {
  ['trenchLen', 'startDepth', 'slopeGrade', 'dischargeType'].forEach(id => {
    document.getElementById(id).addEventListener('change', calc);
    document.getElementById(id).addEventListener('input', calc);
  });
  calc();
}

function calc() {
  const len = parseFloat(document.getElementById('trenchLen').value)||50;
  const startD = parseFloat(document.getElementById('startDepth').value)||18;
  const gradePct = parseFloat(document.getElementById('slopeGrade').value)||1.0;

  // Drop in inches = len * (gradePct / 100) * 12
  const dropIn = len * (gradePct / 100) * 12;
  const endD = startD + dropIn;
  const midD = startD + (dropIn / 2);
  const dropPer10 = 10 * (gradePct / 100) * 12;

  // Manning velocity approximation for 4" pipe flowing half full: v = 1.486/n * R^(2/3) * S^(1/2)
  const vel = Math.sqrt(gradePct / 100) * 32 * 0.1;

  document.getElementById('totalDropIn').textContent = dropIn.toFixed(1);
  document.getElementById('endDepthSummary').textContent = `Final Discharge Trench Depth: ${endD.toFixed(1)} Inches (Over ${Math.round(len)} ft)`;
  document.getElementById('flowVelocity').textContent = `≈ ${vel.toFixed(1)} ft/sec`;
  document.getElementById('dropPer10').textContent = `${dropPer10.toFixed(2)} Inches`;
  document.getElementById('midDepth').textContent = `${midD.toFixed(1)} Inches Deep`;
  document.getElementById('pipeLen').textContent = `${Math.round(len)} ft Perforated Pipe`;
}
window.addEventListener('DOMContentLoaded', init);
