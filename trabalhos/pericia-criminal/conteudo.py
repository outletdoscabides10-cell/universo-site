# -*- coding: utf-8 -*-
"""Conteúdo do trabalho. Tipos de bloco:
   h1 = seção primária (nova página, negrito)
   h2 = seção secundária
   p  = parágrafo comum (recuo 1,25 cm, justificado)
   p0 = parágrafo sem recuo de primeira linha
   cit= citação longa (recuo 4 cm, Arial 10, espaço simples)

   Versão enxuta: limite de 15 folhas no total.
"""

AUTOR = "JOÃO QUADROS"
TITULO = "BIOLOGIA FORENSE"
SUBTITULO = "a contribuição das ciências biológicas para a perícia criminal"
PROFESSORA = "Profa. Cristina"
DISCIPLINA = "Biologia"
INSTITUICAO = "[NOME DA INSTITUIÇÃO DE ENSINO]"
CIDADE = "SÃO PAULO"
ANO = "2026"

NATUREZA = ("Trabalho apresentado à disciplina de Biologia como requisito parcial "
            "para avaliação, sob orientação da Profa. Cristina.")

RESUMO = (
    "A perícia criminal é a atividade técnico-científica que transforma vestígios encontrados em locais de "
    "crime em prova válida para o processo judicial, e boa parte desses vestígios é de natureza biológica. "
    "Este trabalho analisa de que modo conceitos da Biologia são aplicados a essa atividade, com ênfase na "
    "genética forense, na entomologia forense e na tanatologia. A pesquisa foi desenvolvida por meio de "
    "revisão bibliográfica, com base em obras de referência da criminalística brasileira, em artigos "
    "científicos que fundaram a área e em documentos oficiais do Ministério da Justiça e Segurança Pública. "
    "Os resultados mostram que a identificação humana por DNA se apoia em conceitos elementares de genética "
    "e que o Banco Nacional de Perfis Genéticos reunia 272.275 perfis em novembro de 2025, tendo auxiliado "
    "8.132 investigações criminais. A entomologia forense usa o ciclo de vida de insetos ectotérmicos como "
    "cronômetro biológico para estimar o intervalo post-mortem, e a tanatologia interpreta fenômenos "
    "cadavéricos de explicação bioquímica. Conclui-se que a prova biológica, embora robusta, não é "
    "autossuficiente: depende da cadeia de custódia e de interpretação honesta."
)

PALAVRAS_CHAVE = ("Biologia forense. Perícia criminal. DNA. Entomologia forense. Cadeia de custódia.")

CORPO = [

# ============================ 1 INTRODUÇÃO ============================
("h1", "1 INTRODUÇÃO"),
("p", "Quando um crime acontece, alguma coisa quase sempre fica para trás: uma gota de sangue, um fio de "
      "cabelo, um inseto pousado sobre um corpo, um grão de pólen na sola de um sapato. Esses materiais são "
      "chamados de vestígios e constituem a matéria-prima da perícia criminal. O princípio que sustenta essa "
      "atividade foi formulado no início do século XX pelo criminalista francês Edmond Locard e ficou "
      "conhecido como princípio da troca: todo contato entre duas superfícies produz transferência recíproca "
      "de material, ainda que imperceptível a olho nu."),
("p", "Chama a atenção a proporção desses vestígios que pertence ao domínio da Biologia. Sangue, saliva, "
      "pelos, ossos, insetos e plantas são objetos de estudo das ciências biológicas antes de serem objetos "
      "da criminalística, e interpretá-los exige conhecimentos do currículo escolar: a estrutura do DNA, o "
      "papel do ATP na contração muscular, o desenvolvimento pós-embrionário dos insetos e a sucessão "
      "ecológica. Daí o problema que orienta esta pesquisa: de que maneira os conhecimentos da Biologia são "
      "aplicados à perícia criminal, e quais são os limites reais dessa aplicação? A segunda parte da "
      "pergunta importa tanto quanto a primeira, porque a ficção policial consolidou no público a ideia de "
      "que um vestígio biológico produz respostas imediatas e definitivas — fenômeno conhecido como efeito "
      "CSI."),
("p", "O objetivo geral é analisar a contribuição das ciências biológicas para a perícia criminal, "
      "descrevendo o percurso do vestígio, explicando a identificação humana por DNA e a estimativa do tempo "
      "de morte pelos insetos, e discutindo criticamente as limitações da prova biológica. O trabalho "
      "caracteriza-se como pesquisa bibliográfica, baseada em obras de referência da criminalística "
      "brasileira, em artigos científicos originais, na legislação processual penal e no XXIII Relatório da "
      "Rede Integrada de Bancos de Perfis Genéticos, de novembro de 2025, do qual foram extraídos os dados "
      "estatísticos do capítulo 3."),

# ============ 2 PERÍCIA CRIMINAL E O VESTÍGIO BIOLÓGICO ============
("h1", "2 PERÍCIA CRIMINAL E O VESTÍGIO BIOLÓGICO"),

("h2", "2.1 O perito, o local de crime e a preservação do vestígio"),
("p", "Perícia criminal é o exame técnico-científico realizado sobre vestígios de uma infração penal, para "
      "esclarecer materialidade, dinâmica e, quando possível, autoria. O artigo 158 do Código de Processo "
      "Penal estabelece que, havendo vestígios, o exame de corpo de delito é indispensável e nem mesmo a "
      "confissão do acusado pode substituí-lo: a palavra vale menos do que aquilo que o vestígio material "
      "demonstra. Convém desfazer um equívoco comum, porém — o perito não determina quem é culpado; ele "
      "estabelece fatos técnicos, e a conclusão sobre responsabilidade penal cabe ao juiz."),
("p", "A preservação do local é a etapa mais frágil da cadeia, pois depende de pessoas que nem sempre são "
      "peritos, e vestígios biológicos são invisíveis em pequena quantidade e se degradam rápido. O perito "
      "usa luvas, máscara e macacão descartáveis não apenas por proteção, mas para evitar que suas próprias "
      "células contaminem a amostra. O acondicionamento ilustra bem a aplicação de conceitos biológicos: "
      "material úmido jamais deve ser embalado em plástico, porque o plástico retém umidade, a umidade "
      "favorece bactérias e fungos, e as nucleases desses micro-organismos degradam o DNA. A recomendação é "
      "secar o material à sombra e acondicioná-lo em envelope de papel."),

("h2", "2.2 A cadeia de custódia"),
("p", "Esse rigor se organiza sob um conceito incorporado ao Código de Processo Penal pela Lei nº 13.964, de "
      "2019, o Pacote Anticrime, que inseriu os artigos 158-A a 158-F. O artigo 158-A assim o define:"),
("cit", "Considera-se cadeia de custódia o conjunto de todos os procedimentos utilizados para manter e "
        "documentar a história cronológica do vestígio coletado em locais ou em vítimas de crimes, para "
        "rastrear sua posse e manuseio a partir de seu reconhecimento até o descarte. (BRASIL, 1941, art. 158-A)"),
("p", "O artigo 158-B detalha dez etapas obrigatórias: reconhecimento, isolamento, fixação, coleta, "
      "acondicionamento, transporte, recebimento, processamento, armazenamento e descarte. Havendo ruptura "
      "da cadeia — um lacre violado, uma amostra sem identificação —, a prova pode ser considerada "
      "imprestável ainda que o exame laboratorial tenha sido perfeito. Essa é a primeira lição do tema: em "
      "perícia criminal, procedimento e resultado têm o mesmo peso."),

# ================== 3 GENÉTICA FORENSE ==================
("h1", "3 GENÉTICA FORENSE: O DNA COMO DOCUMENTO DE IDENTIDADE"),
("p", "Em 10 de setembro de 1984, no laboratório do geneticista Alec Jeffreys, na Universidade de Leicester, "
      "uma radiografia de um experimento com DNA revelou padrões de bandas ao mesmo tempo semelhantes e "
      "distintos entre membros de uma família. Jeffreys percebeu ali um marcador capaz de individualizar "
      "pessoas e publicou o achado na revista Nature no ano seguinte. A primeira aplicação criminal veio "
      "logo depois, na investigação do assassinato de duas adolescentes em Narborough, na Inglaterra. O "
      "resultado costuma ser lembrado pela metade: a técnica identificou o autor, Colin Pitchfork, condenado "
      "em 1988, mas antes disso inocentou Richard Buckland, que já havia confessado os crimes e se tornou a "
      "primeira pessoa da história exonerada por exame de DNA."),

("h2", "3.1 Por que o DNA identifica uma pessoa"),
("p", "O genoma humano contém cerca de 3,2 bilhões de pares de bases, e duas pessoas tomadas ao acaso "
      "compartilham aproximadamente 99,9% dessa sequência. A identificação forense apoia-se na fração "
      "restante — cerca de 0,1%, o que ainda corresponde a milhões de posições variáveis. Os marcadores "
      "usados na perícia situam-se em regiões não codificantes do genoma, escolha que não é casual: como "
      "essas regiões não determinam características do indivíduo, o perfil genético não revela cor dos "
      "olhos, altura ou predisposição a doenças, funcionando como um código numérico e não como um retrato "
      "biológico. Vale lembrar que todas as células nucleadas de uma pessoa contêm o mesmo DNA; um detalhe "
      "costuma surpreender, porém, é que as hemácias humanas maduras não têm núcleo, de modo que o DNA de "
      "uma mancha de sangue provém dos leucócitos."),

("h2", "3.2 Os marcadores STR e o perfil genético"),
("p", "Os marcadores empregados são os STR, sigla de Short Tandem Repeats: trechos curtos de DNA, de dois a "
      "seis pares de bases, que se repetem lado a lado um número variável de vezes. Se a sequência TCTA se "
      "repete onze vezes em um ponto do cromossomo de uma pessoa e catorze no de outra, elas têm alelos "
      "diferentes naquele ponto, chamado locus. Como os cromossomos são homólogos, cada indivíduo tem dois "
      "alelos por locus, um materno e outro paterno. Um locus isolado individualiza pouco; o poder "
      "discriminatório vem da análise simultânea de vários. O padrão internacional, adotado pelo sistema "
      "CODIS e também pelo Brasil, ampliou em 2017 o conjunto de treze para vinte marcadores centrais, e a "
      "probabilidade de duas pessoas não aparentadas coincidirem em todos eles é da ordem de uma em "
      "quatrilhões. É esse cálculo que confere força à prova genética. Os kits incluem ainda a amelogenina, "
      "presente nos cromossomos X e Y com tamanhos distintos, que permite determinar o sexo biológico."),

("h2", "3.3 A PCR: multiplicando quantidades mínimas de DNA"),
("p", "Vestígios reais fornecem quantidades ínfimas de material genético. O obstáculo foi superado pela "
      "reação em cadeia da polimerase, a PCR, concebida em 1983 por Kary Mullis, que recebeu o Nobel de "
      "Química em 1993. Cada ciclo tem três etapas definidas por temperatura: a desnaturação, a cerca de "
      "95 °C, rompe as pontes de hidrogênio e separa a dupla hélice; o anelamento, entre 50 °C e 60 °C, "
      "permite que os primers se liguem às fitas molde; a extensão, a cerca de 72 °C, sintetiza a fita "
      "complementar. A enzima usada é a Taq polimerase, extraída da bactéria termófila Thermus aquaticus, "
      "isolada de fontes termais do Parque de Yellowstone — uma bactéria adaptada a viver em água fervente "
      "tornou possível a genética forense moderna. O rendimento é exponencial: trinta ciclos produzem cerca "
      "de um bilhão de cópias. Essa sensibilidade extrema, porém, é a origem do principal risco da técnica, "
      "pois qualquer contaminação é amplificada com a mesma eficiência."),

("h2", "3.4 O Banco Nacional de Perfis Genéticos"),
("p", "Um perfil genético vale muito mais quando pode ser confrontado com uma base de dados. No Brasil essa "
      "função cabe à Rede Integrada de Bancos de Perfis Genéticos, que opera com o software CODIS, cedido "
      "pelo FBI. O marco legal foi a Lei nº 12.654, de 2012, ampliada pela Lei nº 13.964, de 2019. Segundo o "
      "XXIII Relatório da Rede, com dados de 28 de novembro de 2025, o Banco Nacional reunia 272.275 perfis "
      "genéticos, dos quais 206.642 (76%) eram referências de indivíduos cadastrados criminalmente e 38.475 "
      "(14%) provinham de vestígios de locais de crime. O relatório registra 8.347 coincidências entre "
      "vestígios, 2.904 entre vestígio e indivíduo cadastrado e 8.132 investigações criminais auxiliadas. "
      "Entre os vestígios predominam os de crimes sexuais (40,60%), seguidos dos crimes contra o patrimônio "
      "(37,98%) e contra a vida (11,63%). Cerca de 10% dos perfis relacionam-se a pessoas desaparecidas, "
      "função humanitária que permite a famílias recuperar seus mortos."),
("p", "Os números revelam também uma desigualdade que merece registro crítico: São Paulo responde sozinho "
      "por 35,36% dos perfis de vestígios do país e por mais da metade das coincidências entre vestígios, e "
      "alguns estados sequer possuem banco instalado. A probabilidade de um crime ser esclarecido por DNA no "
      "Brasil depende, portanto, da unidade da federação em que ele ocorreu."),

("h2", "3.5 Os limites da prova genética"),
("p", "A prova genética é robusta, mas não é infalível. Gêmeos monozigóticos apresentam perfis STR "
      "idênticos, e a técnica convencional não os distingue. A sensibilidade da PCR transforma qualquer "
      "contaminação em problema grave. O ponto mais relevante, contudo, é a transferência secundária: "
      "células deixadas em um objeto podem ser levadas desse objeto a outro por um terceiro, sem que a "
      "pessoa de origem jamais tenha tocado o segundo. Encontrar o DNA de alguém em um local prova que "
      "material biológico dessa pessoa ali chegou; não prova como, quando, nem que ela estivesse presente no "
      "momento do crime. Confundir essas proposições é um erro lógico com consequências penais concretas. "
      "Acrescente-se que exames reais demoram semanas, muitos vestígios não geram perfis utilizáveis e o "
      "resultado se expressa em probabilidade, não em certeza absoluta."),

# ================== 4 ENTOMOLOGIA FORENSE ==================
("h1", "4 ENTOMOLOGIA FORENSE: OS INSETOS COMO RELÓGIOS BIOLÓGICOS"),
("p", "Se a genética responde à pergunta sobre quem, a entomologia forense responde a uma pergunta "
      "frequentemente mais difícil: quando. Nas primeiras horas após o óbito a estimativa apoia-se nos "
      "fenômenos cadavéricos, tratados na seção 5.1; passadas cerca de 72 horas, porém, esses fenômenos "
      "perdem valor e os insetos tornam-se a fonte mais confiável."),

("h2", "4.1 O cadáver como ecossistema temporário"),
("p", "A decomposição resulta de dois processos: a autólise, autodigestão dos tecidos pelas enzimas das "
      "próprias células, e a putrefação, promovida por bactérias da microbiota intestinal que, sem o "
      "controle do sistema imunológico, proliferam e se disseminam. O processo costuma ser dividido em "
      "quatro fases — fresca, gasosa, coliquativa e esqueletização —, cada uma com características "
      "físico-químicas distintas que atraem comunidades diferentes de organismos, num padrão de sucessão "
      "previsível. As moscas varejeiras da família Calliphoridae chegam primeiro, em minutos ou poucas "
      "horas, depositando ovos em orifícios naturais e ferimentos; seguem-se Sarcophagidae e Muscidae e, nas "
      "fases secas, besouros das famílias Dermestidae e Cleridae, adaptados a tecidos ressecados e queratina."),

("h2", "4.2 O ciclo de vida dos dípteros e o intervalo post-mortem"),
("p", "A técnica central apoia-se em conteúdo elementar de zoologia: o desenvolvimento pós-embrionário dos "
      "insetos holometábolos. As moscas passam por metamorfose completa — ovo, larva subdividida em três "
      "ínstares, pupa e adulto —, e a duração de cada etapa é conhecida experimentalmente. Coletados os "
      "insetos, identificam-se as espécies e determina-se o estágio do espécime mais avançado; conhecido o "
      "tempo necessário para atingir aquele estágio, obtém-se o tempo mínimo desde a colonização do cadáver, "
      "que aproxima o intervalo post-mortem. Cabe sublinhar o termo mínimo: a entomologia estabelece que a "
      "morte ocorreu há pelo menos determinado tempo, não exatamente há determinado tempo. No Brasil, as "
      "espécies de maior interesse forense incluem Chrysomya albiceps, Chrysomya megacephala e Cochliomyia "
      "macellaria, e a identificação correta é indispensável, pois espécies próximas se desenvolvem em "
      "velocidades diferentes."),

("h2", "4.3 Temperatura e graus-dia acumulados"),
("p", "Há uma variável que não pode ser ignorada: insetos são ectotérmicos, e sua temperatura corporal "
      "acompanha a do ambiente. Como a velocidade das reações enzimáticas do crescimento depende da "
      "temperatura, uma larva se desenvolve mais depressa no calor. A solução é o conceito de graus-dia "
      "acumulados, ou soma térmica: cada espécie necessita de uma quantidade aproximadamente constante de "
      "energia térmica para completar o desenvolvimento, calculada somando-se, dia a dia, a diferença entre "
      "a temperatura média e a temperatura-base, abaixo da qual o desenvolvimento cessa. Um exemplo "
      "esclarece: se uma espécie precisa de 250 graus-dia acima de uma base de 10 °C para ir do ovo à pupa, "
      "a 25 °C acumulam-se 15 graus-dia por dia e o desenvolvimento leva cerca de 16,7 dias; a 30 °C "
      "acumulam-se 20 por dia e o mesmo desenvolvimento se completa em 12,5 dias. A diferença de mais de "
      "quatro dias basta para alterar a avaliação de um álibi, razão pela qual o laudo entomológico exige "
      "dados meteorológicos do local."),

# ================== 5 OUTRAS ÁREAS ==================
("h1", "5 OUTRAS ÁREAS DA BIOLOGIA APLICADAS À PERÍCIA"),

("h2", "5.1 Tanatologia forense"),
("p", "A tanatologia estuda as alterações do organismo após a morte. O algor mortis é o resfriamento "
      "progressivo do corpo, a uma taxa comumente estimada entre 0,5 °C e 1,5 °C por hora, muito variável. O "
      "livor mortis é o acúmulo de sangue nas regiões mais baixas por ação da gravidade, formando manchas "
      "que aparecem entre vinte minutos e três horas e se fixam por volta de oito a doze horas; livores "
      "fixados em posição incompatível com a do corpo encontrado indicam que ele foi movimentado após a "
      "morte. O rigor mortis é o mais interessante biologicamente, porque sua explicação é bioquímica: "
      "durante a vida, a separação das pontes cruzadas entre actina e miosina depende da ligação de ATP à "
      "miosina; com a morte cessa a respiração celular, o ATP se esgota, as pontes não se desfazem e a "
      "musculatura permanece contraída. A rigidez começa entre uma e três horas, atinge o máximo entre seis "
      "e doze e desaparece entre vinte e quatro e quarenta e oito horas, quando as enzimas da autólise "
      "degradam as proteínas contráteis."),

("h2", "5.2 Serologia forense"),
("p", "Antes do exame genético é preciso localizar o vestígio e determinar sua natureza. Os testes "
      "presuntivos são rápidos e aplicáveis no local, mas não específicos. O mais conhecido é o luminol: o "
      "ferro do grupo heme da hemoglobina catalisa sua oxidação por peróxido de hidrogênio, reação que "
      "libera luz azulada — quimioluminescência. A sensibilidade detecta sangue mesmo em manchas lavadas, "
      "mas o teste responde a qualquer catalisador semelhante, e hipoclorito de sódio, íons de cobre e "
      "peroxidases vegetais, como as de raiz-forte e batata, produzem falsos positivos. Um luminol positivo "
      "indica onde procurar, não que ali exista sangue humano."),

("h2", "5.3 Botânica e palinologia forense"),
("p", "A palinologia forense estuda grãos de pólen, cuja parede externa é constituída de esporopolenina, um "
      "dos compostos orgânicos mais resistentes conhecidos. Como a morfologia dos grãos é característica de "
      "cada táxon e cada região tem composição vegetal própria, o conjunto aderido a roupas ou calçados "
      "funciona como assinatura do ambiente por onde a pessoa passou. Um caso concreto ilustra o alcance da "
      "área: em 1992, no Arizona, o corpo de Denise Johnson foi encontrado junto a árvores da espécie palo "
      "verde, e na caçamba da caminhonete do suspeito, Mark Bogan, havia vagens dessa planta. Um geneticista "
      "vegetal analisou o DNA das vagens e o comparou ao de várias árvores da área, demonstrando que cada "
      "exemplar tinha perfil distinto e que as vagens correspondiam a uma árvore específica do local do "
      "crime. Foi a primeira vez que DNA vegetal foi admitido como prova em julgamento criminal."),

("h2", "5.4 Antropologia e toxicologia forenses"),
("p", "Quando resta apenas o esqueleto, a antropologia forense reconstrói o perfil biológico. O sexo é "
      "estimado sobretudo pela pelve, cuja morfologia difere em razão da adaptação ao parto; a idade, pela "
      "erupção dentária e pela fusão das epífises dos ossos longos em jovens, e por alterações da sínfise "
      "púbica em adultos; a estatura, por equações de regressão aplicadas a fêmur, tíbia e úmero, "
      "específicas para cada população. Já a toxicologia forense pesquisa substâncias capazes de causar a "
      "morte, e a escolha da matriz segue critérios fisiológicos: o humor vítreo é preferido em cadáveres "
      "por estar protegido em cavidade fechada, e o cabelo, que cresce cerca de um centímetro por mês, "
      "permite reconstruir meses de exposição pela análise segmentada do fio."),

# ================== 6 CONSIDERAÇÕES FINAIS ==================
("h1", "6 CONSIDERAÇÕES FINAIS"),
("p", "A perícia criminal moderna depende de conceitos biológicos que não são periféricos nem avançados: são "
      "conteúdos fundamentais. A identificação por DNA apoia-se na estrutura do material genético e na "
      "existência de regiões não codificantes; a PCR reproduz a replicação do DNA e só se tornou viável "
      "graças a uma enzima de bactéria termófila; a entomologia forense é aplicação direta do "
      "desenvolvimento pós-embrionário dos insetos e da ectotermia; a tanatologia explica o rigor mortis "
      "pelo esgotamento do ATP. Em cada caso, o que sustenta a técnica pericial é Biologia básica."),
("p", "Os resultados são expressivos e mensuráveis: o XXIII Relatório da Rede Integrada de Bancos de Perfis "
      "Genéticos mostra 272.275 perfis em novembro de 2025 e 8.132 investigações auxiliadas, embora com "
      "distribuição desigual entre os estados. O ponto mais importante, porém, diz respeito aos limites. A "
      "prova biológica é forte, mas não é autossuficiente: seu valor depende da preservação da cadeia de "
      "custódia, pois uma análise perfeita sobre amostra sem rastreabilidade não produz prova alguma. "
      "Depende também de interpretação honesta, já que um perfil coincidente demonstra que um material "
      "pertence a certa pessoa, mas não demonstra como ou quando chegou ao local."),
("p", "Talvez a síntese esteja no caso que inaugurou a área: a mesma técnica que identificou Colin Pitchfork "
      "havia antes inocentado Richard Buckland, que confessara crimes que não cometera. A Biologia aplicada "
      "à perícia criminal não serve apenas para acusar; serve para que decisões que afetam profundamente a "
      "vida das pessoas sejam tomadas a partir de evidência verificável. Reconhecer o que essa evidência "
      "demonstra — e o que ela não demonstra — é parte indissociável do seu uso responsável."),
]

REFERENCIAS = [
 "BRASIL. Decreto-Lei nº 3.689, de 3 de outubro de 1941. Código de Processo Penal. Rio de Janeiro: "
 "Presidência da República, 1941. Disponível em: "
 "https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm. Acesso em: 18 set. 2026.",

 "BRASIL. Lei nº 12.654, de 28 de maio de 2012. Altera as Leis nº 12.037, de 1º de outubro de 2009, e "
 "nº 7.210, de 11 de julho de 1984, para prever a coleta de perfil genético como forma de identificação "
 "criminal. Brasília, DF: Presidência da República, 2012. Disponível em: "
 "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/lei/l12654.htm. Acesso em: 18 set. 2026.",

 "BRASIL. Lei nº 13.964, de 24 de dezembro de 2019. Aperfeiçoa a legislação penal e processual penal. "
 "Brasília, DF: Presidência da República, 2019. Disponível em: "
 "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13964.htm. Acesso em: 18 set. 2026.",

 "BRASIL. Ministério da Justiça e Segurança Pública. XXIII Relatório da Rede Integrada de Bancos de "
 "Perfis Genéticos: dados estatísticos e resultados – maio/2025 a novembro/2025. Brasília, DF: MJSP, "
 "2025. Disponível em: https://www.gov.br/mj/pt-br/assuntos/sua-seguranca/seguranca-publica/ribpg. "
 "Acesso em: 18 set. 2026.",

 "ESTADOS UNIDOS. Court of Appeals of Arizona. State v. Bogan, 183 Ariz. 506, 905 P.2d 515. Phoenix, "
 "1995.",

 "GILL, Peter; JEFFREYS, Alec J.; WERRETT, David J. Forensic application of DNA fingerprints. Nature, "
 "Londres, v. 318, p. 577-579, 1985.",

 "GOMES, Leonardo. Entomologia forense: novas tendências e tecnologias nas ciências criminais. Rio de "
 "Janeiro: Technical Books, 2010.",

 "JEFFREYS, Alec J.; WILSON, Victoria; THEIN, Swee Lay. Individual-specific fingerprints of human DNA. "
 "Nature, Londres, v. 316, p. 76-79, 1985.",

 "MULLIS, Kary B. The unusual origin of the polymerase chain reaction. Scientific American, Nova York, "
 "v. 262, n. 4, p. 56-65, abr. 1990.",

 "OLIVEIRA-COSTA, Janyra (coord.). Entomologia forense: quando os insetos são vestígios. 4. ed. "
 "Campinas: Millennium, 2025.",

 "VELHO, Jesus Antonio; GEISER, Gustavo Caminoto; ESPINDULA, Alberi (org.). Ciências forenses: uma "
 "introdução às principais áreas da criminalística moderna. 4. ed. Campinas: Millennium, 2021.",
]
