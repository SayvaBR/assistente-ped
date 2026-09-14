"""Extract official skill paragraphs; preserve the recovered EI catalog separately.
Input is the 600-page homologated MEC PDF in references/. No generated descriptions.
"""
import json, re, hashlib
from pathlib import Path
import pymupdf
source=Path('references/bncc-oficial.pdf')
document=pymupdf.open(source)
pattern=re.compile(r'\((E[FM][0-9]{2}[A-Z]{2,3}[0-9]{2,3})\)')
skills={}
for index,page in enumerate(document):
    if index<80: continue # Introductory code examples are not the catalog.
    for block in page.get_text('blocks'):
        text=block[4]
        matches=list(pattern.finditer(text))
        for n,match in enumerate(matches):
            description=' '.join(text[match.end():matches[n+1].start() if n+1<len(matches) else len(text)].split())
            code=match.group(1)
            if code in skills:
                assert skills[code]['texto']==description, f'Conflicting definitions: {code}'
            else: skills[code]={'codigo':code,'texto':description,'pagina':index+1}
assert len(skills)==1487
assert not any('\ufffd' in s['texto'] for s in skills.values())
Path('src/data/bncc-fundamental-medio.json').write_text(json.dumps(list(skills.values()),ensure_ascii=False,indent=2),encoding='utf-8')
Path('references/bncc-provenance.json').write_text(json.dumps({'url':'https://basenacionalcomum.mec.gov.br/images/BNCC_EI_EF_110518_versaofinal_site.pdf','sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'pages':len(document),'skills':len(skills),'downloadedAt':'2026-09-10','extraction':'PyMuPDF text blocks; duplicate paragraphs compared exactly'},indent=2),encoding='utf-8')
print(f'Extracted {len(skills)} unique official skills.')
