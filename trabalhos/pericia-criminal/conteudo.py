# -*- coding: utf-8 -*-
"""Conteúdo do trabalho. Tipos de bloco:
   h1 = seção primária (nova página, negrito)
   h2 = seção secundária
   p  = parágrafo comum (recuo 1,25 cm, justificado)
   p0 = parágrafo sem recuo de primeira linha
   cit= citação longa (recuo 4 cm, Arial 10, espaço simples)
"""

AUTOR = "JOÃO QUADROS"
TITULO = "BIOLOGIA FORENSE"
SUBTITULO = "a contribuição das ciências biológicas para a perícia criminal"
PROFESSORA = "Profa. Cristina"
DISCIPLINA = "Biologia"
INSTITUICAO = "[NOME DA INSTITUIÇÃO DE ENSINO]"
CIDADE = "[CIDADE]"
ANO = "2026"

NATUREZA = ("Trabalho apresentado à disciplina de Biologia como requisito parcial "
            "para avaliação, sob orientação da Profa. Cristina.")

RESUMO = (
    "A perícia criminal é a atividade técnico-científica responsável por transformar os vestígios "
    "encontrados em locais de crime em prova válida para o processo judicial. Boa parte desses vestígios "
    "é de natureza biológica, o que torna a Biologia uma das ciências mais presentes na criminalística "
    "contemporânea. Este trabalho tem como objetivo analisar de que modo conceitos biológicos são "
    "efetivamente aplicados à perícia criminal, com ênfase na genética forense, na entomologia forense e "
    "na tanatologia. A pesquisa foi desenvolvida por meio de revisão bibliográfica, com base em obras de "
    "referência da criminalística brasileira, em artigos científicos que fundaram a área e em documentos "
    "oficiais do Ministério da Justiça e Segurança Pública. Os resultados indicam que a identificação "
    "humana por DNA se apoia em conceitos elementares de genética — estrutura do material genético, "
    "variabilidade individual e regiões não codificantes do genoma — e que, no Brasil, o Banco Nacional de "
    "Perfis Genéticos reunia 272.275 perfis em novembro de 2025, tendo auxiliado 8.132 investigações "
    "criminais. A entomologia forense utiliza o ciclo de vida de insetos ectotérmicos como cronômetro "
    "biológico para estimar o intervalo post-mortem, ao passo que a tanatologia interpreta fenômenos "
    "cadavéricos de explicação bioquímica e celular. Conclui-se que a prova biológica, embora tecnicamente "
    "robusta, não é autossuficiente: seu valor depende da preservação da cadeia de custódia e de uma "
    "interpretação estatisticamente honesta, distante da imagem de infalibilidade difundida pela ficção."
)

PALAVRAS_CHAVE = ("Biologia forense. Perícia criminal. DNA. Entomologia forense. Cadeia de custódia.")

CORPO = [

# ============================ 1 INTRODUÇÃO ============================
("h1", "1 INTRODUÇÃO"),
("p", "Quando um crime acontece, alguma coisa quase sempre fica para trás: uma gota de sangue seca em um "
      "batente, um fio de cabelo preso a um agasalho, um inseto pousado sobre um corpo, um grão de pólen "
      "aderido à sola de um sapato. Esses materiais recebem o nome de vestígios e constituem a matéria-prima "
      "da perícia criminal. O princípio que sustenta essa atividade foi formulado no início do século XX "
      "pelo criminalista francês Edmond Locard e ficou conhecido como princípio da troca: todo contato entre "
      "duas superfícies produz transferência recíproca de material, ainda que imperceptível a olho nu."),
("p", "Chama a atenção a proporção desses vestígios que pertence ao domínio da Biologia. Sangue, sêmen, "
      "saliva, pelos, ossos, insetos, plantas e micro-organismos são objetos de estudo das ciências "
      "biológicas antes de serem objetos da criminalística, e interpretá-los exige conhecimentos que fazem "
      "parte do currículo escolar: a estrutura da molécula de DNA, o funcionamento das enzimas, o papel do "
      "ATP na contração muscular, o desenvolvimento pós-embrionário dos insetos e a sucessão ecológica. A "
      "perícia criminal não é, nesse sentido, uma ciência separada: é a aplicação de ciências já conhecidas "
      "ao problema de reconstruir um evento passado a partir daquilo que dele restou."),
("p", "O problema que orienta esta pesquisa pode ser enunciado assim: de que maneira os conhecimentos da "
      "Biologia são efetivamente aplicados à perícia criminal, e quais são os limites reais dessa aplicação? "
      "A segunda parte da pergunta importa tanto quanto a primeira. Séries e filmes policiais consolidaram "
      "no público a ideia de que a análise de um vestígio biológico produz respostas imediatas e "
      "definitivas, fenômeno que a literatura especializada denomina efeito CSI; a realidade laboratorial e "
      "processual é consideravelmente mais complexa."),
("p", "O objetivo geral é analisar a contribuição das ciências biológicas para a perícia criminal. Como "
      "objetivos específicos, pretende-se: a) descrever o percurso do vestígio biológico, do local de crime "
      "ao laudo, e a função da cadeia de custódia; b) explicar a base biológica e os procedimentos da "
      "identificação humana por DNA, com dados atualizados do Banco Nacional de Perfis Genéticos; c) "
      "demonstrar como o ciclo de vida de insetos permite estimar o tempo decorrido desde a morte; d) "
      "apresentar outras áreas da Biologia aplicadas à perícia; e e) discutir criticamente as limitações da "
      "prova biológica."),
("p", "A justificativa é dupla: socialmente, trata-se de compreender um instrumento que interfere "
      "diretamente na vida de pessoas, já que a mesma tecnologia que aponta a autoria de um crime é capaz de "
      "inocentar alguém acusado injustamente; no plano escolar, o tema permite verificar que conteúdos de "
      "Biologia estudados em sala possuem aplicação concreta fora dela. "
      "Quanto à metodologia, este trabalho caracteriza-se como pesquisa bibliográfica de natureza "
      "qualitativa e descritiva. Foram consultadas obras de referência da criminalística brasileira, artigos "
      "científicos originais, a legislação processual penal vigente e o XXIII Relatório da Rede Integrada de "
      "Bancos de Perfis Genéticos, publicado em novembro de 2025, do qual foram extraídos os dados "
      "estatísticos do capítulo 3. O texto está organizado em seis capítulos: após esta introdução, o "
      "capítulo 2 trata do percurso do vestígio; o capítulo 3, da genética forense; o capítulo 4, da "
      "entomologia forense; o capítulo 5, de outras áreas biológicas aplicadas à perícia; e o capítulo 6 "
      "traz as considerações finais."),

# ============ 2 PERÍCIA CRIMINAL E O VESTÍGIO BIOLÓGICO ============
("h1", "2 PERÍCIA CRIMINAL E O VESTÍGIO BIOLÓGICO"),
("p", "Um exame laboratorial impecável perde todo o valor se o material analisado tiver sido coletado de "
      "forma inadequada ou se não for possível comprovar que a amostra examinada é a mesma recolhida no "
      "local do crime. Por isso o estudo da perícia criminal começa pelo vestígio, e não pelo laboratório."),

("h2", "2.1 O perito criminal e a prova pericial"),
("p", "Perícia criminal é o exame técnico-científico realizado sobre vestígios de uma infração penal, com a "
      "finalidade de esclarecer materialidade, dinâmica e, quando possível, autoria. Quem a realiza é o "
      "perito criminal, servidor público concursado e portador de diploma de curso superior, e o documento "
      "que registra o exame é o laudo pericial, peça técnica que integra o processo judicial."),
("p", "A importância legal desse exame é considerável. O artigo 158 do Código de Processo Penal estabelece "
      "que, quando a infração deixar vestígios, o exame de corpo de delito é indispensável, e que nem mesmo "
      "a confissão do acusado pode substituí-lo. Trata-se de escolha deliberada do legislador: a palavra, "
      "inclusive a do próprio réu, vale menos do que aquilo que o vestígio material demonstra — uma pessoa "
      "pode confessar um crime que não cometeu, por pressão ou para proteger terceiros; uma mancha de sangue "
      "não se retrata. Convém, porém, desfazer um equívoco: o perito não determina quem é o culpado. Ele "
      "estabelece fatos técnicos, e a passagem desses fatos para a conclusão sobre responsabilidade penal é "
      "atribuição do juiz, com base em todo o conjunto probatório."),

("h2", "2.2 O local de crime e a preservação do vestígio"),
("p", "O local de crime é o espaço onde ocorreu o fato e onde se encontram os vestígios. Sua preservação é a "
      "etapa mais frágil de toda a cadeia, porque depende frequentemente de pessoas que não são peritos: o "
      "primeiro policial a chegar, a equipe de socorro, eventuais testemunhas. Vestígios biológicos são "
      "especialmente vulneráveis, pois são invisíveis em pequena quantidade e se degradam rapidamente. O "
      "trabalho pericial segue sequência ordenada — isolamento da área, observação e registro fotográfico, "
      "fixação, coleta, acondicionamento e transporte —, e cada etapa envolve cuidados de fundamento "
      "biológico. O perito usa luvas, máscara, touca e macacão descartáveis não apenas para proteção "
      "individual, mas sobretudo para evitar que suas próprias células epiteliais, sua saliva ou seus "
      "cabelos contaminem a amostra: um profissional desprotegido que fale próximo a um vestígio pode nele "
      "depositar DNA suficiente para gerar um perfil genético."),
("p", "O acondicionamento ilustra bem a aplicação de conceitos biológicos elementares. Material biológico "
      "úmido jamais deve ser embalado em plástico: o plástico retém a umidade, e a umidade favorece a "
      "proliferação de bactérias e fungos, cujas enzimas nucleases degradam o DNA da amostra. A recomendação "
      "técnica é secar o material à temperatura ambiente, ao abrigo da luz solar direta, e acondicioná-lo em "
      "envelopes de papel, que permitem trocas gasosas."),

("h2", "2.3 A cadeia de custódia"),
("p", "Todo esse rigor se organiza sob um conceito central, incorporado de forma expressa ao Código de "
      "Processo Penal pela Lei nº 13.964, de 2019, conhecida como Pacote Anticrime, que inseriu os artigos "
      "158-A a 158-F. O artigo 158-A assim o define:"),
("cit", "Considera-se cadeia de custódia o conjunto de todos os procedimentos utilizados para manter e "
        "documentar a história cronológica do vestígio coletado em locais ou em vítimas de crimes, para "
        "rastrear sua posse e manuseio a partir de seu reconhecimento até o descarte. (BRASIL, 1941, art. 158-A)"),
("p", "A mesma lei detalha, no artigo 158-B, dez etapas obrigatórias de rastreamento: reconhecimento, "
      "isolamento, fixação, coleta, acondicionamento, transporte, recebimento, processamento, armazenamento "
      "e descarte. Cada transferência do vestígio entre pessoas ou setores deve ser formalmente registrada, "
      "de modo que seja sempre possível responder quem esteve com aquele material, quando e por quê."),
("p", "A consequência prática é severa. Havendo ruptura da cadeia de custódia — um lacre violado, uma lacuna "
      "no registro, uma amostra sem identificação —, a prova pode ser considerada imprestável, ainda que o "
      "exame laboratorial tenha sido tecnicamente perfeito. Um resultado de DNA irrepreensível não serve de "
      "nada se não for possível demonstrar que a amostra analisada é a que foi colhida no local. Essa é a "
      "primeira lição importante do tema: em perícia criminal, procedimento e resultado têm o mesmo peso."),

# ================== 3 GENÉTICA FORENSE ==================
("h1", "3 GENÉTICA FORENSE: O DNA COMO DOCUMENTO DE IDENTIDADE BIOLÓGICO"),
("p", "A identificação humana por DNA é a contribuição mais conhecida da Biologia à perícia criminal, e sua "
      "história tem data e lugar definidos. Em 10 de setembro de 1984, no laboratório do geneticista Alec "
      "Jeffreys, na Universidade de Leicester, na Inglaterra, uma radiografia de um experimento com DNA "
      "revelou padrões de bandas simultaneamente semelhantes e distintos entre membros de uma mesma família. "
      "Jeffreys percebeu que tinha diante de si um marcador capaz de individualizar pessoas, e publicou o "
      "achado no ano seguinte na revista Nature."),
("p", "A primeira aplicação criminal ocorreu pouco depois, na investigação dos assassinatos de duas "
      "adolescentes em Narborough, na Inglaterra. O resultado costuma ser lembrado apenas pela metade: a "
      "técnica identificou o autor, Colin Pitchfork, condenado em 1988, mas antes disso inocentou Richard "
      "Buckland, jovem que já confessara os crimes e que se tornou a primeira pessoa da história exonerada "
      "por exame de DNA. O caso inaugural da genética forense é, portanto, também o caso inaugural de uma "
      "confissão falsa desmontada pela Biologia."),

("h2", "3.1 A base biológica: por que o DNA identifica uma pessoa"),
("p", "O DNA humano é uma molécula de dupla hélice formada por nucleotídeos cujas bases nitrogenadas — "
      "adenina, timina, citosina e guanina — se pareiam de modo complementar. O genoma humano contém "
      "aproximadamente 3,2 bilhões de pares de bases distribuídos em 23 pares de cromossomos, e duas pessoas "
      "tomadas ao acaso compartilham cerca de 99,9% dessa sequência. A identificação forense apoia-se "
      "justamente na fração restante: cerca de 0,1% do genoma, o que ainda corresponde a milhões de posições "
      "em que os indivíduos diferem."),
("p", "Há um segundo fundamento, igualmente importante. Apenas pequena parte do genoma codifica proteínas; a "
      "maior parte é não codificante, e é nessas regiões que se situam os marcadores forenses. A escolha não "
      "é casual: como tais regiões não determinam características do indivíduo, o perfil genético forense "
      "não revela cor dos olhos, altura ou predisposição a doenças. Ele funciona como um código numérico, "
      "comparável a um número de documento, e não como um retrato biológico — uma salvaguarda de privacidade "
      "embutida na própria escolha do marcador. Vale lembrar ainda que todas as células nucleadas de um "
      "indivíduo contêm o mesmo DNA, razão pela qual sangue, saliva, sêmen e bulbo capilar fornecem perfis "
      "idênticos; um detalhe costuma surpreender: as hemácias humanas maduras não possuem núcleo, de modo "
      "que o DNA extraído de uma mancha de sangue provém dos leucócitos, não das hemácias."),

("h2", "3.2 Os marcadores STR e o perfil genético"),
("p", "Os marcadores empregados atualmente são os STR, sigla de Short Tandem Repeats, ou repetições curtas "
      "em sequência: trechos curtos de DNA, geralmente de dois a seis pares de bases, que se repetem lado a "
      "lado um número variável de vezes. Se a sequência TCTA se repete onze vezes em um determinado ponto do "
      "cromossomo de uma pessoa e catorze vezes no de outra, essas pessoas possuem alelos diferentes naquele "
      "ponto, chamado locus. Como os cromossomos são homólogos, cada indivíduo possui dois alelos por locus, "
      "um materno e outro paterno, e o resultado é um par de números — por exemplo, 11 e 14."),
("p", "Analisado isoladamente, um locus tem pouquíssimo poder de individualização, pois muitas pessoas "
      "compartilham a mesma combinação; o poder discriminatório surge da análise simultânea de vários loci. "
      "O padrão internacional consolidado, adotado pelo sistema CODIS, do FBI, e também pelo Brasil, ampliou "
      "em 2017 o conjunto original de treze marcadores para vinte marcadores centrais. Multiplicando-se as "
      "frequências populacionais de cada alelo, a probabilidade de duas pessoas não aparentadas coincidirem "
      "em todos esses loci torna-se extraordinariamente pequena, da ordem de uma em quatrilhões. É esse "
      "cálculo, e não uma suposta impressão digital biológica única, que confere força à prova genética. Os "
      "kits comerciais incluem ainda a amelogenina, marcador presente nos cromossomos X e Y com tamanhos "
      "distintos em cada um, cuja comparação permite determinar o sexo biológico da amostra."),

("h2", "3.3 A PCR: multiplicando quantidades mínimas de DNA"),
("p", "Um obstáculo prático persistia: vestígios reais fornecem quantidades ínfimas de material genético. "
      "Ele foi superado pela reação em cadeia da polimerase, a PCR, concebida em 1983 pelo bioquímico "
      "norte-americano Kary Mullis, que por ela recebeu o Prêmio Nobel de Química em 1993. A PCR reproduz em "
      "tubo de ensaio, de forma controlada, a replicação do DNA que ocorre nas células. Cada ciclo "
      "compreende três etapas definidas por temperatura: na desnaturação, a mistura é aquecida a cerca de "
      "95 °C, rompendo as pontes de hidrogênio entre as bases e separando a dupla hélice em fitas simples; "
      "no anelamento, a temperatura cai para uma faixa entre 50 °C e 60 °C, permitindo que os primers — "
      "sequências sintéticas complementares às extremidades da região de interesse — se liguem às fitas "
      "molde; na extensão, a temperatura sobe a aproximadamente 72 °C, e a DNA polimerase sintetiza a fita "
      "complementar."),
("p", "Um aspecto pouco divulgado dessa técnica é seu débito com a ecologia microbiana. As temperaturas "
      "empregadas desnaturariam qualquer polimerase humana; a enzima utilizada é a Taq polimerase, extraída "
      "da bactéria termófila Thermus aquaticus, isolada de fontes termais do Parque Nacional de Yellowstone, "
      "nos Estados Unidos. Uma bactéria adaptada a viver em água fervente tornou possível a genética forense "
      "moderna — argumento concreto, e não retórico, em favor da conservação da biodiversidade."),
("p", "O rendimento da reação é exponencial: cada ciclo duplica o número de cópias, de modo que n ciclos "
      "produzem 2 elevado a n moléculas a partir de uma única. Após trinta ciclos obtêm-se cerca de um "
      "bilhão de cópias, quantidade mais do que suficiente para leitura laboratorial. Essa mesma "
      "sensibilidade extrema, porém, é a origem do principal risco da técnica: havendo contaminação, o DNA "
      "contaminante será amplificado com a mesma eficiência do DNA de interesse."),

("h2", "3.4 Eletroforese capilar e a leitura do perfil"),
("p", "Amplificados os fragmentos, resta separá-los e medi-los, tarefa da eletroforese capilar. A técnica "
      "explora uma propriedade química do DNA: os grupos fosfato de seu esqueleto conferem à molécula carga "
      "elétrica negativa. Submetidos a um campo elétrico dentro de um capilar preenchido com polímero, os "
      "fragmentos migram em direção ao polo positivo, e os menores avançam mais rapidamente por encontrarem "
      "menor resistência na malha do polímero. Como os primers são marcados com moléculas fluorescentes de "
      "cores distintas, um feixe de laser ao final do capilar excita cada fragmento na passagem e um "
      "detector registra a emissão. O resultado é o eletroferograma, gráfico em que cada pico corresponde a "
      "um alelo; a leitura dos picos produz o perfil genético, uma tabela de pares numéricos."),

("h2", "3.5 DNA mitocondrial e cromossomo Y: quando o DNA nuclear não basta"),
("p", "Ossos antigos, dentes, corpos carbonizados e fios de cabelo sem bulbo frequentemente fornecem "
      "material muito degradado. Nesses casos recorre-se ao DNA mitocondrial. As mitocôndrias possuem genoma "
      "próprio, circular, presente às centenas ou aos milhares em cada célula, enquanto o núcleo contém "
      "apenas uma cópia de cada cromossomo, e essa abundância aumenta a chance de recuperação em amostras "
      "degradadas. Há, contudo, limitação decisiva decorrente do padrão de herança: o DNA mitocondrial é "
      "transmitido exclusivamente pela mãe, de modo que todos os indivíduos de uma mesma linhagem materna "
      "compartilham o mesmo haplótipo. Ele não individualiza; exclui ou indica pertencimento a uma linhagem, "
      "o que é particularmente útil na identificação de pessoas desaparecidas."),
("p", "Situação análoga ocorre com os marcadores do cromossomo Y, transmitido de pai para filho homem "
      "praticamente sem recombinação. Sua utilidade maior está na investigação de crimes sexuais: em "
      "amostras com mistura de material biológico feminino e masculino, nas quais o DNA feminino é muito "
      "mais abundante, esses marcadores permitem isolar o componente masculino. A limitação é a mesma: todos "
      "os homens de uma linhagem paterna apresentam o mesmo perfil."),

("h2", "3.6 O Banco Nacional de Perfis Genéticos: a genética forense no Brasil"),
("p", "A utilidade de um perfil genético aumenta enormemente quando ele pode ser confrontado com uma base de "
      "dados. No Brasil, essa função cabe à Rede Integrada de Bancos de Perfis Genéticos, que articula os "
      "bancos estaduais, o da Polícia Federal e o Banco Nacional de Perfis Genéticos, operando com o "
      "software CODIS, cedido pelo FBI. O marco legal foi a Lei nº 12.654, de 2012, que autorizou a coleta "
      "de material genético de condenados por determinados crimes, posteriormente ampliada pela Lei "
      "nº 13.964, de 2019."),
("p", "Os dados a seguir constam do XXIII Relatório da Rede Integrada de Bancos de Perfis Genéticos, "
      "consolidados até 28 de novembro de 2025. Naquela data, o Banco Nacional reunia 272.275 perfis "
      "genéticos, com crescimento de 17.697 perfis, ou 6,9%, em relação ao semestre anterior. Desse total, "
      "206.642 perfis, equivalentes a 76%, correspondiam a amostras de referência de indivíduos cadastrados "
      "criminalmente, e 38.475 perfis, ou 14%, provinham de vestígios coletados em locais de crime ou em "
      "vítimas. Quanto aos resultados, o relatório registra 8.347 coincidências confirmadas entre vestígios, "
      "que conectam crimes distintos cometidos pelo mesmo autor, e 2.904 coincidências entre vestígio e "
      "indivíduo cadastrado, que apontam possível autoria; ao todo, 8.132 investigações criminais foram "
      "auxiliadas. Entre os vestígios armazenados predominam os relacionados a crimes sexuais, com 40,60%, "
      "seguidos dos crimes contra o patrimônio, com 37,98%, e dos crimes contra a vida, com 11,63%."),
("p", "O banco não se destina apenas à investigação criminal. Cerca de 10% dos perfis relacionam-se à busca "
      "de pessoas desaparecidas, incluindo 13.424 perfis de restos mortais não identificados e 13.535 "
      "perfis de referência de desaparecidos ou de seus familiares. Nesse campo, a genética forense cumpre "
      "função humanitária, permitindo que famílias recuperem os corpos de seus mortos."),
("p", "Os números revelam também uma desigualdade que merece registro crítico. São Paulo responde sozinho "
      "por 13.607 perfis de vestígios, isto é, 35,36% dessa categoria em todo o país, e por mais da metade "
      "das coincidências do tipo vestígio contra vestígio; alguns estados sequer possuem banco próprio "
      "instalado. Isso significa que a probabilidade de um crime ser esclarecido por DNA no Brasil depende, "
      "em medida não desprezível, da unidade da federação em que ele ocorreu."),

("h2", "3.7 Limites e cuidados na interpretação da prova genética"),
("p", "A prova genética é robusta, mas não é infalível, e reconhecer seus limites faz parte do domínio "
      "técnico do assunto. Gêmeos monozigóticos, originados de um mesmo zigoto, apresentam perfis STR "
      "idênticos, de modo que a técnica convencional não os distingue. A sensibilidade da PCR, por sua vez, "
      "transforma qualquer contaminação em problema grave: pequenas quantidades de DNA alheio introduzidas "
      "durante a coleta ou o processamento são amplificadas junto com a amostra e podem gerar perfis mistos "
      "de difícil interpretação."),
("p", "O ponto mais relevante, porém, é o fenômeno da transferência secundária. Células epiteliais deixadas "
      "em um objeto podem ser transferidas desse objeto para outro por um terceiro, sem que a pessoa de "
      "origem jamais tenha tocado o segundo objeto. Encontrar o DNA de alguém em determinado local prova que "
      "material biológico dessa pessoa ali chegou; não prova como nem quando chegou, tampouco que ela "
      "esteve presente no momento do crime. Confundir essas proposições é um erro lógico com consequências "
      "penais concretas."),
("p", "Cabe retomar, por fim, o efeito CSI. A ficção televisiva apresenta resultados obtidos em minutos, "
      "sempre conclusivos e sempre disponíveis. Na prática, exames demoram semanas ou meses, muitos "
      "vestígios não geram perfis utilizáveis por degradação ou quantidade insuficiente, e o resultado se "
      "expressa em termos probabilísticos, não em certezas absolutas. A expectativa irreal criada por essa "
      "distorção em júris e na opinião pública é objeto de preocupação entre profissionais da área."),

# ================== 4 ENTOMOLOGIA FORENSE ==================
("h1", "4 ENTOMOLOGIA FORENSE: OS INSETOS COMO RELÓGIOS BIOLÓGICOS"),
("p", "Se a genética forense responde à pergunta sobre quem, a entomologia forense responde a uma pergunta "
      "frequentemente mais difícil: quando. Determinar há quanto tempo uma pessoa morreu é decisivo para "
      "confirmar ou refutar álibis e para reconstruir a sequência dos fatos. Nas primeiras horas após o "
      "óbito, essa estimativa apoia-se em fenômenos cadavéricos, tratados na seção 5.1; passadas cerca de "
      "72 horas, porém, esses fenômenos perdem valor, e os insetos tornam-se a fonte mais confiável."),

("h2", "4.1 A decomposição cadavérica e a sucessão ecológica"),
("p", "A decomposição é um processo biológico ordenado, resultante de dois fatores. O primeiro é a autólise, "
      "autodigestão dos tecidos pelas enzimas das próprias células, que se rompem quando cessa o "
      "fornecimento de oxigênio. O segundo é a putrefação, promovida por micro-organismos, sobretudo "
      "bactérias da microbiota intestinal que, sem o controle do sistema imunológico, proliferam e se "
      "disseminam. A literatura brasileira costuma dividir o processo em quatro fases: a fresca ou "
      "cromática, com as primeiras alterações de coloração; a gasosa ou enfisematosa, marcada pela produção "
      "de gases por bactérias anaeróbias; a coliquativa, de liquefação dos tecidos moles; e a "
      "esqueletização, quando restam apenas estruturas resistentes."),
("p", "O ponto ecologicamente relevante é que cada fase apresenta características físico-químicas distintas "
      "e, por isso, atrai comunidades diferentes de organismos. Um cadáver funciona como um ecossistema "
      "temporário, colonizado segundo um padrão de sucessão razoavelmente previsível. Moscas varejeiras, da "
      "família Calliphoridae, costumam ser as primeiras a chegar, em minutos ou poucas horas, depositando "
      "ovos preferencialmente em orifícios naturais e ferimentos, onde o substrato é úmido. Seguem-se as "
      "moscas das famílias Sarcophagidae e Muscidae e, nas fases mais secas, os besouros das famílias "
      "Dermestidae e Cleridae, adaptados a tecidos ressecados e a queratina."),

("h2", "4.2 O ciclo de vida dos dípteros e a estimativa do intervalo post-mortem"),
("p", "A técnica central da entomologia forense apoia-se em conteúdo elementar de zoologia: o "
      "desenvolvimento pós-embrionário dos insetos holometábolos. As moscas passam por metamorfose "
      "completa, percorrendo as etapas de ovo, larva — subdividida em três ínstares separados por mudas —, "
      "pupa e adulto, e a duração de cada etapa, para dada espécie e sob dadas condições, é conhecida "
      "experimentalmente."),
("p", "O raciocínio pericial decorre disso: coletados os insetos presentes no corpo, identificam-se as "
      "espécies e determina-se o estágio de desenvolvimento do espécime mais avançado; conhecido o tempo "
      "necessário para que aquela espécie atinja aquele estágio, obtém-se o tempo mínimo decorrido desde a "
      "colonização do cadáver — e, como a colonização costuma ser rápida, esse valor aproxima o intervalo "
      "post-mortem mínimo. Cabe sublinhar o termo mínimo: a entomologia estabelece que a morte ocorreu há "
      "pelo menos determinado tempo, não exatamente há determinado tempo. No Brasil, entre as espécies de "
      "maior interesse forense estão Chrysomya albiceps, Chrysomya megacephala, Chrysomya putoria, "
      "Cochliomyia macellaria e Lucilia eximia; a identificação correta da espécie é indispensável, pois "
      "espécies próximas podem ter velocidades de desenvolvimento bastante diferentes."),

("h2", "4.3 Temperatura e graus-dia acumulados"),
("p", "Existe, contudo, uma variável que não pode ser ignorada. Insetos são animais ectotérmicos, isto é, "
      "não regulam internamente a própria temperatura corporal, que acompanha a do ambiente. Como a "
      "velocidade das reações enzimáticas responsáveis pelo crescimento depende da temperatura, uma larva se "
      "desenvolve mais depressa no calor e mais devagar no frio; dizer que determinada espécie leva dez dias "
      "para completar o ciclo, sem informar a temperatura, é dizer muito pouco."),
("p", "A solução adotada é o conceito de graus-dia acumulados, ou soma térmica. Parte-se do princípio de que "
      "cada espécie necessita de quantidade aproximadamente constante de energia térmica para completar seu "
      "desenvolvimento, quantidade calculada somando-se, dia a dia, a diferença entre a temperatura média "
      "registrada e a temperatura-base, abaixo da qual o desenvolvimento praticamente cessa. Um exemplo "
      "esclarece o procedimento: suponha-se que determinada espécie necessite de 250 graus-dia acima de uma "
      "temperatura-base de 10 °C para ir do ovo ao estágio de pupa. Se a temperatura média no local foi de "
      "25 °C, acumulam-se 15 graus-dia por dia, e o desenvolvimento levaria cerca de 16,7 dias; a 30 °C, "
      "acumulam-se 20 graus-dia por dia, e o mesmo desenvolvimento se completaria em 12,5 dias. A diferença "
      "entre as duas estimativas — mais de quatro dias — é suficiente para alterar completamente a avaliação "
      "de um álibi. Por isso o laudo entomológico exige dados meteorológicos do local, geralmente obtidos em "
      "estações próximas e corrigidos por medições na própria cena."),

("h2", "4.4 Outras aplicações e limitações"),
("p", "A contribuição dos insetos não se esgota na estimativa temporal. A entomotoxicologia utiliza larvas "
      "como matriz para análise toxicológica quando não restam tecidos moles suficientes, uma vez que "
      "substâncias ingeridas pela vítima se acumulam nos tecidos das larvas que dela se alimentaram — "
      "registre-se, porém, que várias dessas substâncias alteram a velocidade de desenvolvimento larval, "
      "exigindo correção nos cálculos. A composição da fauna também pode indicar deslocamento do corpo: "
      "encontrar em um cadáver espécies típicas de ambiente rural, em local urbano, sugere transporte após a "
      "morte. Há ainda aplicação em pessoas vivas, na constatação de miíase associada a negligência ou "
      "maus-tratos."),
("p", "As limitações são reais. Corpos enterrados, submersos ou envoltos em plástico ou tecidos apresentam "
      "colonização retardada ou ausente, e altitude, estação do ano, exposição ao sol e vegetação "
      "influenciam o processo. Acrescente-se que os dados de desenvolvimento variam conforme a população "
      "geográfica da espécie e que ainda não há tabelas experimentais completas para todas as espécies em "
      "todas as regiões brasileiras, o que impõe cautela na transposição de parâmetros obtidos em outros "
      "países."),

# ================== 5 OUTRAS ÁREAS ==================
("h1", "5 OUTRAS ÁREAS DA BIOLOGIA APLICADAS À PERÍCIA CRIMINAL"),
("p", "A genética e a entomologia são as frentes mais visíveis, mas não esgotam a presença da Biologia na "
      "criminalística. Esta seção apresenta, de forma mais sintética, outras cinco áreas de aplicação."),

("h2", "5.1 Tanatologia forense: os fenômenos cadavéricos"),
("p", "A tanatologia estuda as alterações que o organismo sofre após a morte, e três fenômenos são usados na "
      "estimativa do intervalo post-mortem nas primeiras horas. O algor mortis é o resfriamento progressivo "
      "do corpo, que perde calor para o ambiente uma vez cessado o metabolismo, a uma taxa comumente "
      "estimada entre 0,5 °C e 1,5 °C por hora, muito variável conforme vestuário, massa corporal e "
      "ventilação. O livor mortis é o acúmulo de sangue nas regiões mais baixas do corpo por ação da "
      "gravidade, após a parada da circulação, formando manchas arroxeadas que aparecem entre vinte minutos "
      "e três horas e se fixam por volta de oito a doze horas; daí decorre um dado pericial valioso, pois "
      "livores fixados em posição incompatível com a do corpo encontrado indicam que ele foi movimentado "
      "após a morte."),
("p", "O rigor mortis é o mais interessante do ponto de vista biológico, porque sua explicação é "
      "estritamente bioquímica. Durante a vida, a separação das pontes cruzadas entre actina e miosina, que "
      "permite o relaxamento muscular, depende da ligação de ATP à miosina. Com a morte cessa a respiração "
      "celular e a produção de ATP se esgota; sem ATP, as pontes formadas não se desfazem e a musculatura "
      "permanece contraída. A rigidez começa entre uma e três horas após o óbito, atinge o máximo entre seis "
      "e doze horas e desaparece entre vinte e quatro e quarenta e oito horas, quando as enzimas da autólise "
      "degradam as proteínas contráteis. Soma-se a mancha verde abdominal, primeira manifestação visível da "
      "putrefação, perceptível na fossa ilíaca direita após dezoito a vinte e quatro horas. Todas essas "
      "estimativas, ressalte-se, são aproximações."),

("h2", "5.2 Serologia forense: identificação de fluidos biológicos"),
("p", "Antes de qualquer exame genético é preciso localizar o vestígio e determinar sua natureza, função da "
      "serologia forense, que opera em dois níveis: testes presuntivos, rápidos e aplicáveis no local, porém "
      "não específicos, e testes confirmatórios, laboratoriais. O mais conhecido dos presuntivos é o "
      "luminol: o ferro do grupo heme da hemoglobina catalisa sua oxidação por peróxido de hidrogênio, "
      "reação que libera energia na forma de luz azulada, fenômeno denominado quimioluminescência. A "
      "sensibilidade é notável, detectando sangue mesmo em manchas lavadas, mas o teste responde a qualquer "
      "catalisador semelhante: hipoclorito de sódio, presente em água sanitária, íons de cobre e peroxidases "
      "vegetais, como as de raiz-forte e batata, produzem falsos positivos. Um resultado positivo de luminol "
      "indica onde procurar, não que ali exista sangue humano. Para outros fluidos empregam-se marcadores "
      "específicos, como a fosfatase ácida prostática para sêmen e a amilase salivar para saliva."),

("h2", "5.3 Botânica e palinologia forense"),
("p", "Plantas também produzem vestígios. A palinologia forense estuda grãos de pólen e esporos, cuja parede "
      "externa, a exina, é constituída de esporopolenina, um dos compostos orgânicos mais resistentes "
      "conhecidos. Como a morfologia dos grãos é característica de cada táxon e cada região tem composição "
      "vegetal própria, o conjunto aderido a roupas, calçados ou veículos funciona como assinatura do "
      "ambiente por onde a pessoa ou o objeto passou. Outro instrumento é o exame de diatomáceas, algas "
      "unicelulares de carapaça silicosa, aplicado ao diagnóstico de afogamento: se a pessoa estava viva ao "
      "entrar na água, os movimentos respiratórios levam água aos pulmões e a circulação ainda ativa "
      "transporta diatomáceas a órgãos distantes, como medula óssea, fígado e rins; se o corpo foi lançado à "
      "água já sem vida, não há circulação que as transporte."),
("p", "Um caso concreto ilustra o alcance da botânica forense. Em 1992, no Arizona, Estados Unidos, o corpo "
      "de Denise Johnson foi encontrado próximo a árvores da espécie conhecida como palo verde, e na caçamba "
      "da caminhonete do suspeito, Mark Bogan, havia vagens dessa planta. Um geneticista vegetal da "
      "Universidade do Arizona analisou o DNA das vagens e o comparou ao de diversas árvores da área, "
      "demonstrando que cada exemplar tinha perfil distinto e que as vagens correspondiam a uma árvore "
      "específica do local do crime. Foi a primeira vez que DNA vegetal foi admitido como prova em "
      "julgamento criminal."),

("h2", "5.4 Microbiologia forense e o necrobioma"),
("p", "Linha de pesquisa mais recente investiga as comunidades microbianas associadas à decomposição, "
      "conjunto designado por necrobioma. Estudos indicam que a sucessão dessas comunidades de bactérias e "
      "fungos segue padrões reproduzíveis ao longo do tempo, o que abriu a possibilidade de utilizá-las como "
      "relógio microbiano complementar aos métodos entomológicos, com vantagem potencial em corpos "
      "enterrados, nos quais o acesso dos insetos é limitado. A técnica ainda não possui o grau de validação "
      "exigido para uso rotineiro em processos penais e deve ser tratada como campo em desenvolvimento."),

("h2", "5.5 Antropologia forense: o que os ossos revelam"),
("p", "Quando resta apenas o esqueleto, a análise cabe à antropologia forense, que busca reconstruir o "
      "perfil biológico do indivíduo. O sexo é estimado principalmente pela pelve, cuja morfologia difere "
      "entre homens e mulheres em razão da adaptação ao parto: o ângulo subpúbico é mais aberto e a incisura "
      "isquiática maior é mais ampla nas mulheres. A idade é estimada por marcadores que variam com a faixa "
      "etária — em jovens, a erupção dentária e a fusão das epífises dos ossos longos, que se completa por "
      "volta dos vinte e cinco anos; em adultos, alterações da sínfise púbica e das suturas cranianas, com "
      "margens de erro maiores. A estatura é obtida por equações de regressão aplicadas ao comprimento de "
      "fêmur, tíbia e úmero, específicas para cada população, razão pela qual a antropologia forense "
      "brasileira desenvolveu fórmulas adaptadas à população nacional. O exame das lesões ósseas permite "
      "ainda distinguir traumas ocorridos em vida, no momento da morte e após ela."),

("h2", "5.6 Toxicologia forense"),
("p", "A toxicologia forense pesquisa substâncias capazes de causar ou contribuir para a morte, e a escolha "
      "da matriz analisada segue critérios fisiológicos. Sangue e urina são as amostras de referência, mas o "
      "humor vítreo, líquido contido no globo ocular, é frequentemente preferido em cadáveres por estar "
      "protegido em cavidade fechada e resistir melhor à decomposição. O cabelo oferece janela temporal "
      "ampla: como cresce a cerca de um centímetro por mês e incorpora substâncias presentes na corrente "
      "sanguínea durante sua formação, a análise segmentada do fio permite reconstruir o histórico de "
      "exposição ao longo de meses. O trabalho organiza-se em triagem por imunoensaio, seguida de "
      "confirmação por cromatografia acoplada à espectrometria de massas."),

# ================== 6 CONSIDERAÇÕES FINAIS ==================
("h1", "6 CONSIDERAÇÕES FINAIS"),
("p", "Este trabalho procurou responder de que maneira os conhecimentos da Biologia são aplicados à perícia "
      "criminal e quais são os limites dessa aplicação. O percurso realizado permite três conclusões."),
("p", "A primeira é que a perícia criminal moderna depende de conceitos biológicos que não são periféricos "
      "nem avançados: são conteúdos fundamentais. A identificação por DNA apoia-se na estrutura do material "
      "genético, na existência de regiões não codificantes e na variabilidade individual. A PCR reproduz a "
      "replicação do DNA e só se tornou viável graças a uma enzima de bactéria termófila. A entomologia "
      "forense é aplicação direta do desenvolvimento pós-embrionário dos insetos e da ectotermia. A "
      "tanatologia explica o rigor mortis pelo esgotamento do ATP e pela persistência das pontes de actina e "
      "miosina. Em cada caso, o que sustenta a técnica pericial é conteúdo de Biologia básica."),
("p", "A segunda é que os resultados alcançados são expressivos e mensuráveis. Os dados oficiais do XXIII "
      "Relatório da Rede Integrada de Bancos de Perfis Genéticos mostram um banco com 272.275 perfis em "
      "novembro de 2025 e 8.132 investigações criminais auxiliadas, além de função humanitária relevante na "
      "identificação de pessoas desaparecidas. Esses números revelam, contudo, distribuição desigual entre "
      "as unidades da federação, com forte concentração em poucos estados, o que sinaliza que o acesso à "
      "prova genética no Brasil ainda não é uniforme."),
("p", "A terceira, e mais importante, diz respeito aos limites. A prova biológica é forte, mas não é "
      "autossuficiente nem infalível. Seu valor depende inteiramente da preservação da cadeia de custódia, "
      "exigência que a Lei nº 13.964, de 2019, incorporou expressamente ao Código de Processo Penal: uma "
      "análise laboratorial perfeita sobre uma amostra cuja rastreabilidade se perdeu não produz prova "
      "alguma. Depende, igualmente, de interpretação honesta — um perfil genético coincidente demonstra que "
      "determinado material biológico pertence a determinada pessoa, mas não demonstra como, quando ou em "
      "que circunstância esse material chegou ao local. A transferência secundária de células epiteliais e a "
      "possibilidade de contaminação impõem prudência que a representação televisiva do tema sistematicamente "
      "omite."),
("p", "Talvez a síntese mais adequada esteja no caso que inaugurou a área: a mesma técnica que identificou "
      "Colin Pitchfork havia, antes disso, inocentado Richard Buckland, que já confessara crimes que não "
      "cometera. A Biologia aplicada à perícia criminal não serve apenas para acusar; serve, sobretudo, para "
      "que decisões que afetam profundamente a vida das pessoas sejam tomadas a partir de evidência "
      "verificável, e não de aparências ou convicções pessoais. Reconhecer com clareza o que essa evidência "
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
