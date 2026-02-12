import re

VAGUE_TERMS = [
    "eco-friendly", "green", "sustainable",
    "natural", "environmentally responsible",
    "planet-friendly"
]

CERT_KEYWORDS = [
    "fsc", "gots", "energy star", "iso", "ecolabel"
]

def analyze_claim_text(text: str):
    text_lower = text.lower()

    # Count vague terms
    vague_count = sum(1 for term in VAGUE_TERMS if term in text_lower)

    # Vagueness score
    if vague_count == 0:
        vagueness_score = 0.1
    elif vague_count == 1:
        vagueness_score = 0.4
    elif vague_count == 2:
        vagueness_score = 0.7
    else:
        vagueness_score = 0.9

    # Evidence check (numbers or %)
    evidence_present = 1 if re.search(r"\d+%|\d+", text_lower) else 0

    # Certification check
    certification_present = 1 if any(cert in text_lower for cert in CERT_KEYWORDS) else 0

    # Credibility score (same formula you used in dataset)
    credibility_score = round(
        evidence_present * 40 +
        certification_present * 40 +
        (1 - vagueness_score) * 20
    )

    consumer_risk = 100 - credibility_score

    environmental_confidence = round(
        certification_present * 50 +
        evidence_present * 30 +
        (1 - vagueness_score) * 20
    )

    # Risk label
    if credibility_score >= 70:
        risk = "Low"
        gw_type = "None"
        why = "Claim contains measurable evidence or certification"
    elif credibility_score >= 40:
        risk = "Medium"
        gw_type = "No Proof"
        why = "Claim lacks sufficient measurable evidence"
    else:
        risk = "High"
        gw_type = "Vagueness"
        why = "Claim uses vague environmental language without proof"

    return {
        "risk": f"{risk} Greenwashing Risk",
        "greenwashing_type": gw_type,
        "why_flagged": why,
        "vagueness_score": vagueness_score,
        "evidence_present": evidence_present,
        "certification_present": certification_present,
        "credibility_score": credibility_score,
        "consumer_risk_score": consumer_risk,
        "environmental_confidence": environmental_confidence
    }
