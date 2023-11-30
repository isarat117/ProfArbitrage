import db from "./database";

let minPercent = 0
let maxPercent = 0
let lang = 'en'



const setWords =(wordId)=>{
   

    // min percent, max percent settings
    db.transaction(tx=>{
        tx.executeSql(`select * from valueForScan`,null,(txObj,resultSet)=>{
            if(resultSet.rows.length>0){
                
            minPercent = resultSet.rows._array[0].minPercent
            maxPercent = resultSet.rows._array[0].maxPercent
          
            }
            else{
                minPercent=5
                maxPercent=10
            }
        })

        tx.executeSql(`select * from activeLang`,null,(txObj, resultSet)=>{
             lang = (resultSet.rows._array[0].lang)
        })
    })


    const dic ={
        word1:{
            tr:`Aktif olan yüzde aralığı : %${minPercent} ve %${maxPercent}`,// türkçe
            en:`Active percentage range : %${minPercent} and %${maxPercent}`,//ingilizce
            es:`Rango de porcentaje activo : %${minPercent} y %${maxPercent}`,//ispanyolca
            fr:`Plage de pourcentage active : %${minPercent} et %${maxPercent}`,//fransızca
            cs:`Aktivní procentní rozsah : %${minPercent} a %${maxPercent}`,// çekçe
            de:`Aktiver Prozentbereich : %${minPercent} und %${maxPercent}`,//almanca
            zh:`有效百分比范围：%${minPercent} 和 %${maxPercent}`,//çince
            id:`Rentang persentase aktif: %${minPercent} dan %${maxPercent}`,//endonezya
            it:`Intervallo percentuale attivo : %${minPercent} e %${maxPercent}`,//italyanca
            ja:`アクティブなパーセンテージの範囲：%${minPercent}と%${maxPercent}。`,// japonca
            ko:`활성 백분율 범위: %${minPercent} 및 %${maxPercent}`, //korece
            pt:`Intervalo de percentagem ativa: %${minPercent} e %${maxPercent}`, //portekizce
            ru:`Диапазон активных процентов: %${minPercent} и %${maxPercent}`,// rusça
            uk:`Активний діапазон відсотків: %${minPercent} та %${maxPercent}`,//ukraynaca
            bg:`Активен процентен диапазон: %${minPercent} и %${maxPercent}`, //bulgarca
        },
        word2: {
            tr: `Coinleri yükle`, // türkçe
            en: `Load the coins`, // ingilizce
            es: `Cargar las monedas`, // ispanyolca
            fr: `Charger les pièces`, // fransızca
            cs: `Načíst mince`, // çekçe
            de: `Münzen laden`, // almanca
            zh: `加载硬币`, // çince
            id: `Muat koin`, // endonezya
            it: `Carica le monete`, // italyanca
            ja: `コインをロード`, // japonca
            ko: `코인을 불러오세요`, // korece
            pt: `Carregue as moedas`, // portekizce
            ru: `Загрузите монеты`, // rusça
            uk: `Завантажте монети`, // ukraynaca
            bg: `Заредете монетите`, // bulgarca
        },
        word3: {
            tr: 'Yeni aralığı kaydet', // türkçe
            en: 'Save New Range', // ingilizce
            es: 'Guardar nuevo rango', // ispanyolca
            fr: 'Enregistrer la nouvelle plage', // fransızca
            cs: 'Uložit nový rozsah', // çekçe
            de: 'Neuen Bereich speichern', // almanca
            zh: '保存新范围', // çince
            id: 'Simpan Rentang Baru', // endonezya
            it: 'Salva nuovo intervallo', // italyanca
            ja: '新しい範囲を保存', // japonca
            ko: '새로운 범위 저장', // korece
            pt: 'Salvar novo intervalo', // portekizce
            ru: 'Сохранить новый диапазон', // rusça
            uk: 'Зберегти новий діапазон', // ukraynaca
            bg: 'Запазете нов обхват', // bulgarca
        },
        word4: {
            tr: 'Minimum yüzde:', // türkçe
            en: 'Min percent:', // ingilizce
            es: 'Porcentaje mínimo:', // ispanyolca
            fr: 'Pourcentage min:', // fransızca
            cs: 'Minimální procento:', // çekçe
            de: 'Mindestprozentsatz:', // almanca
            zh: '最小百分比：', // çince
            id: 'Persentase minimum:', // endonezya
            it: 'Percentuale minima:', // italyanca
            ja: '最小パーセント：', // japonca
            ko: '최소 백분율:', // korece
            pt: 'Percentagem mínima:', // portekizce
            ru: 'Минимальный процент:', // rusça
            uk: 'Мінімальний відсоток:', // ukraynaca
            bg: 'Минимален процент:', // bulgarca
        },
        
        word5: {
            tr: 'Maksimum yüzde:', // türkçe
            en: 'Max percent:', // ingilizce
            es: 'Porcentaje máximo:', // ispanyolca
            fr: 'Pourcentage max:', // fransızca
            cs: 'Maximální procento:', // çekçe
            de: 'Maximaler Prozentsatz:', // almanca
            zh: '最大百分比：', // çince
            id: 'Persentase maksimum:', // endonezya
            it: 'Percentuale massima:', // italyanca
            ja: '最大パーセント：', // japonca
            ko: '최대 백분율:', // korece
            pt: 'Percentagem máxima:', // portekizce
            ru: 'Максимальный процент:', // rusça
            uk: 'Максимальний відсоток:', // ukraynaca
            bg: 'Максимален процент:', // bulgarca
        },
        word6: {
            tr: 'API Keyleri düzenle', // türkçe
            en: 'Edit API Keys', // ingilizce
            es: 'Editar claves API', // ispanyolca
            fr: 'Éditer les clés API', // fransızca
            cs: 'Upravit klíče API', // çekçe
            de: 'API-Schlüssel bearbeiten', // almanca
            zh: '编辑API密钥', // çince
            id: 'Edit Kunci API', // endonezya
            it: 'Modifica chiavi API', // italyanca
            ja: 'APIキーの編集', // japonca
            ko: 'API 키 편집', // korece
            pt: 'Editar Chaves de API', // portekizce
            ru: 'Редактировать ключи API', // rusça
            uk: 'Редагувати ключі API', // ukraynaca
            bg: 'Редактиране на API ключове', // bulgarca
        },
        word7: {
            tr: 'Dil seçenekleri', // türkçe
            en: 'Language options', // ingilizce
            es: 'Opciones de idioma', // ispanyolca
            fr: 'Options de langue', // fransızca
            cs: 'Možnosti jazyka', // çekçe
            de: 'Sprachoptionen', // almanca
            zh: '语言选项', // çince
            id: 'Opsi Bahasa', // endonezya
            it: 'Opzioni di lingua', // italyanca
            ja: '言語オプション', // japonca
            ko: '언어 옵션', // korece
            pt: 'Opções de idioma', // portekizce
            ru: 'Варианты языка', // rusça
            uk: 'Мовні параметри', // ukraynaca
            bg: 'Езикови опции', // bulgarca
        },
        word8: {
            tr: 'Lütfen Borsa Seçiniz:', // türkçe
            en: 'Please Select Exchange:', // ingilizce
            es: 'Por favor, seleccione un intercambio:', // ispanyolca
            fr: 'Veuillez sélectionner une bourse :', // fransızca
            cs: 'Prosím, vyberte burzu:', // çekçe
            de: 'Bitte wählen Sie die Börse aus:', // almanca
            zh: '请选择交易所：', // çince
            id: 'Silakan Pilih Bursa:', // endonezya
            it: 'Seleziona una borsa:', // italyanca
            ja: '取引所を選択してください：', // japonca
            ko: '거래소를 선택하세요:', // korece
            pt: 'Por favor, selecione uma bolsa:', // portekizce
            ru: 'Пожалуйста, выберите биржу:', // rusça
            uk: 'Будь ласка, виберіть біржу:', // ukraynaca
            bg: 'Моля, изберете борса:', // bulgarca
        },
        word9: {
            tr: 'Api key giriniz', // türkçe
            en: 'Please enter API key', // ingilizce
            es: 'Por favor, ingrese la clave API', // ispanyolca
            fr: 'Veuillez entrer la clé API', // fransızca
            cs: 'Prosím, zadejte API klíč', // çekçe
            de: 'Bitte geben Sie den API-Schlüssel ein', // almanca
            zh: '请输入 API 密钥', // çince
            id: 'Silakan masukkan kunci API', // endonezya
            it: 'Inserisci la chiave API', // italyanca
            ja: 'APIキーを入力してください', // japonca
            ko: 'API 키를 입력하세요', // korece
            pt: 'Por favor, insira a chave de API', // portekizce
            ru: 'Пожалуйста, введите ключ API', // rusça
            uk: 'Будь ласка, введіть ключ API', // ukraynaca
            bg: 'Моля, въведете API ключ', // bulgarca
        },
        
        word10: {
            tr: 'Secret key giriniz', // türkçe
            en: 'Please enter Secret key', // ingilizce
            es: 'Por favor, ingrese la clave secreta', // ispanyolca
            fr: 'Veuillez entrer la clé secrète', // fransızca
            cs: 'Prosím, zadejte tajný klíč', // çekçe
            de: 'Bitte geben Sie den geheimen Schlüssel ein', // almanca
            zh: '请输入密钥', // çince
            id: 'Silakan masukkan kunci rahasia', // endonezya
            it: 'Inserisci la chiave segreta', // italyanca
            ja: 'シークレットキーを入力してください', // japonca
            ko: '비밀 키를 입력하세요', // korece
            pt: 'Por favor, insira a chave secreta', // portekizce
            ru: 'Пожалуйста, введите секретный ключ', // rusça
            uk: 'Будь ласка, введіть секретний ключ', // ukraynaca
            bg: 'Моля, въведете таен ключ', // bulgarca
        },
        word11: {
            tr: 'Anahtarları Kaydet', // türkçe
            en: 'Save Keys', // ingilizce
            es: 'Guardar Claves', // ispanyolca
            fr: 'Enregistrer les Clés', // fransızca
            cs: 'Uložit klíče', // çekçe
            de: 'Schlüssel speichern', // almanca
            zh: '保存密钥', // çince
            id: 'Simpan Kunci', // endonezya
            it: 'Salva Chiavi', // italyanca
            ja: 'キーを保存', // japonca
            ko: '키 저장', // korece
            pt: 'Salvar Chaves', // portekizce
            ru: 'Сохранить ключи', // rusça
            uk: 'Зберегти ключі', // ukraynaca
            bg: 'Запази ключове', // bulgarca
        },
        word12: {
            tr: 'Tebrikler, veri güncellendi', // türkçe
            en: 'Congratulations, data updated', // ingilizce
            es: 'Felicitaciones, los datos se actualizaron', // ispanyolca
            fr: 'Félicitations, les données ont été mises à jour', // fransızca
            cs: 'Gratulace, údaje byly aktualizovány', // çekçe
            de: 'Herzlichen Glückwunsch, die Daten wurden aktualisiert', // almanca
            zh: '恭喜，数据已更新', // çince
            id: 'Selamat, data telah diperbarui', // endonezya
            it: 'Congratulazioni, i dati sono stati aggiornati', // italyanca
            ja: 'おめでとうございます、データが更新されました', // japonca
            ko: '축하합니다, 데이터가 업데이트되었습니다', // korece
            pt: 'Parabéns, os dados foram atualizados', // portekizce
            ru: 'Поздравляем, данные обновлены', // rusça
            uk: 'Вітаємо, дані оновлені', // ukraynaca
            bg: 'Поздравления, данните са актуализирани', // bulgarca
        },
        word13: {
            tr: 'Değişiklikleri Kaydet', // türkçe
            en: 'Save Changes', // ingilizce
            es: 'Guardar Cambios', // ispanyolca
            fr: 'Enregistrer les Modifications', // fransızca
            cs: 'Uložit Změny', // çekçe
            de: 'Änderungen speichern', // almanca
            zh: '保存更改', // çince
            id: 'Simpan Perubahan', // endonezya
            it: 'Salva Modifiche', // italyanca
            ja: '変更を保存', // japonca
            ko: '변경 사항 저장', // korece
            pt: 'Salvar Alterações', // portekizce
            ru: 'Сохранить Изменения', // rusça
            uk: 'Зберегти Зміни', // ukraynaca
            bg: 'Запазване на Промени', // bulgarca
        },
        word14: {
            tr: 'Coin Adı', // türkçe
            en: 'Coin Name', // ingilizce
            es: 'Nombre de la Moneda', // ispanyolca
            fr: 'Nom de la Pièce', // fransızca
            cs: 'Název mince', // çekçe
            de: 'Münzname', // almanca
            zh: '币名', // çince
            id: 'Nama Koin', // endonezya
            it: 'Nome della Moneta', // italyanca
            ja: 'コイン名', // japonca
            ko: '코인 이름', // korece
            pt: 'Nome da Moeda', // portekizce
            ru: 'Название монеты', // rusça
            uk: 'Назва Монети', // ukraynaca
            bg: 'Име на монетата', // bulgarca
        },
        word15: {
            tr: 'Coin Ara', // türkçe
            en: 'Search For Coin', // ingilizce
            es: 'Buscar Moneda', // ispanyolca
            fr: 'Rechercher une Pièce', // fransızca
            cs: 'Vyhledat minci', // çekçe
            de: 'Nach Münze suchen', // almanca
            zh: '寻找币种', // çince
            id: 'Cari Koin', // endonezya
            it: 'Cerca Moneta', // italyanca
            ja: 'コインを検索', // japonca
            ko: '코인 검색', // korece
            pt: 'Buscar Moeda', // portekizce
            ru: 'Поиск монеты', // rusça
            uk: 'Пошук Монети', // ukraynaca
            bg: 'Търсене на Монета', // bulgarca
        },
        word16: {
            tr: 'Borsa Adı:', // türkçe
            en: 'Exchange Name:', // ingilizce
            es: 'Nombre del Intercambio:', // ispanyolca
            fr: 'Nom de la Bourse :', // fransızca
            cs: 'Název burzy:', // çekçe
            de: 'Börsenname:', // almanca
            zh: '交易所名称：', // çince
            id: 'Nama Bursa:', // endonezya
            it: 'Nome della Borsa:', // italyanca
            ja: '取引所名：', // japonca
            ko: '거래소 이름:', // korece
            pt: 'Nome da Bolsa:', // portekizce
            ru: 'Название биржи:', // rusça
            uk: 'Назва біржі:', // ukraynaca
            bg: 'Име на борсата:', // bulgarca
        },
        word17: {
            tr: 'Alış için ortalama:', // türkçe
            en: 'Average for Buy:', // ingilizce
            es: 'Promedio para Comprar:', // ispanyolca
            fr: 'Moyenne pour l\'Achat:', // fransızca
            cs: 'Průměr pro Nákup:', // çekçe
            de: 'Durchschnitt für Kauf:', // almanca
            zh: '购买平均：', // çince
            id: 'Rata-rata Beli:', // endonezya
            it: 'Media per l\'Acquisto:', // italyanca
            ja: '購入の平均：', // japonca
            ko: '매수 평균:', // korece
            pt: 'Média para Compra:', // portekizce
            ru: 'Среднее для Покупки:', // rusça
            uk: 'Середнє для Покупки:', // ukraynaca
            bg: 'Средно за Покупка:', // bulgarca
        },
        word18: {
            tr: 'Burdan Al', // türkçe
            en: 'Buy From Here', // ingilizce
            es: 'Comprar Desde Aquí', // ispanyolca
            fr: 'Acheter D\'ici', // fransızca
            cs: 'Koupit Odsud', // çekçe
            de: 'Von Hier Kaufen', // almanca
            zh: '从这里购买', // çince
            id: 'Beli Dari Sini', // endonezya
            it: 'Acquista Da Qui', // italyanca
            ja: 'ここから購入', // japonca
            ko: '여기서 구매', // korece
            pt: 'Comprar Daqui', // portekizce
            ru: 'Купить Отсюда', // rusça
            uk: 'Купити Звідси', // ukraynaca
            bg: 'Купи Оттук', // bulgarca
        },
        
        word19: {
            tr: 'Burdan Sat', // türkçe
            en: 'Sell From Here', // ingilizce
            es: 'Vender Desde Aquí', // ispanyolca
            fr: 'Vendre D\'ici', // fransızca
            cs: 'Prodat Odsud', // çekçe
            de: 'Von Hier Verkaufen', // almanca
            zh: '从这里出售', // çince
            id: 'Jual Dari Sini', // endonezya
            it: 'Vendi Da Qui', // italyanca
            ja: 'ここから売る', // japonca
            ko: '여기에서 판매', // korece
            pt: 'Vender Daqui', // portekizce
            ru: 'Продать Отсюда', // rusça
            uk: 'Продати Звідси', // ukraynaca
            bg: 'Продай Оттук', // bulgarca
        },
        word20: {
            tr: 'Satış için ortalama:', // türkçe
            en: 'Average for Sell:', // ingilizce
            es: 'Promedio para Vender:', // ispanyolca
            fr: 'Moyenne pour la Vente:', // fransızca
            cs: 'Průměr pro Prodej:', // çekçe
            de: 'Durchschnitt für Verkauf:', // almanca
            zh: '销售平均：', // çince
            id: 'Rata-rata Jual:', // endonezya
            it: 'Media per la Vendita:', // italyanca
            ja: '販売の平均：', // japonca
            ko: '매도 평균:', // korece
            pt: 'Média para Venda:', // portekizce
            ru: 'Среднее для Продажи:', // rusça
            uk: 'Середнє для Продажу:', // ukraynaca
            bg: 'Средно за Продажба:', // bulgarca
        },
        word21: {
            tr: 'Kar', // türkçe
            en: 'Profit', // ingilizce
            es: 'Ganancia', // ispanyolca
            fr: 'Profit', // fransızca
            cs: 'Zisk', // çekçe
            de: 'Gewinn', // almanca
            zh: '盈利', // çince
            id: 'Keuntungan', // endonezya
            it: 'Profitto', // italyanca
            ja: '利益', // japonca
            ko: '이익', // korece
            pt: 'Lucro', // portekizce
            ru: 'Прибыль', // rusça
            uk: 'Прибуток', // ukraynaca
            bg: 'Печалба', // bulgarca
        },
        
        word22: {
            tr: 'Zarar', // türkçe
            en: 'Loss', // ingilizce
            es: 'Pérdida', // ispanyolca
            fr: 'Perte', // fransızca
            cs: 'Ztráta', // çekçe
            de: 'Verlust', // almanca
            zh: '亏损', // çince
            id: 'Kerugian', // endonezya
            it: 'Perdita', // italyanca
            ja: '損失', // japonca
            ko: '손실', // korece
            pt: 'Perda', // portekizce
            ru: 'Убыток', // rusça
            uk: 'Збиток', // ukraynaca
            bg: 'Загуба', // bulgarca
        },
        word23: {
            tr: 'UYARI!!!', // türkçe
            en: 'WARNING!!!', // ingilizce
            es: '¡¡¡ADVERTENCIA!!!', // ispanyolca
            fr: 'ATTENTION !!!', // fransızca
            cs: 'UPOZORNĚNÍ !!!', // çekçe
            de: 'WARNUNG !!!', // almanca
            zh: '警告 !!!', // çince
            id: 'PERINGATAN !!!', // endonezya
            it: 'ATTENZIONE !!!', // italyanca
            ja: '警告 !!!', // japonca
            ko: '경고 !!!', // korece
            pt: 'ATENÇÃO !!!', // portekizce
            ru: 'ВНИМАНИЕ !!!', // rusça
            uk: 'ПОПЕРЕДЖЕННЯ !!!', // ukraynaca
            bg: 'ВНИМАНИЕ !!!', // bulgarca
        },
        word24: {
            tr: 'Burada verilen bilgiler, 500 dolarla işlem açmak isteyen bir kişi için hesaplanmıştır. Hesaplamalarda çekim ücreti bilgisi kullanılmamıştır.', // türkçe
            en: 'The information provided here has been calculated for someone who wants to open a position with 500 dollars. Withdrawal fee information has not been used in the calculations.', // ingilizce
            es: 'La información proporcionada aquí ha sido calculada para alguien que desea abrir una posición con 500 dólares. La información sobre la tarifa de retiro no se ha utilizado en los cálculos.', // ispanyolca
            fr: 'Les informations fournies ici ont été calculées pour quelqu\'un qui souhaite ouvrir une position avec 500 dollars. Les frais de retrait n\'ont pas été utilisés dans les calculs.', // fransızca
            cs: 'Poskytnuté informace byly spočítány pro někoho, kdo chce otevřít pozici s 500 dolary. Informace o poplatku za výběr nebyla použita při výpočtech.', // çekçe
            de: 'Die hier bereitgestellten Informationen wurden für jemanden berechnet, der eine Position mit 500 Dollar eröffnen möchte. Die Informationen zur Auszahlungsgebühr wurden bei den Berechnungen nicht verwendet.', // almanca
            zh: '此处提供的信息已针对希望以500美元开仓的人进行计算。提款费用信息未在计算中使用。', // çince
            id: 'Informasi yang diberikan di sini telah dihitung untuk seseorang yang ingin membuka posisi dengan 500 dolar. Informasi biaya penarikan tidak digunakan dalam perhitungan.', // endonezya
            it: 'Le informazioni fornite qui sono state calcolate per chi desidera aprire una posizione con 500 dollari. Le informazioni sul costo di prelievo non sono state utilizzate nei calcoli.', // italyanca
            ja: 'ここで提供される情報は、500ドルでポジションを開きたい人のために計算されています。出金手数料情報は計算に使用されていません。', // japonca
            ko: '여기에서 제공하는 정보는 500달러로 포지션을 열고 싶어하는 사람을 위해 계산되었습니다. 출금 수수료 정보는 계산에 사용되지 않았습니다.', // korece
            pt: 'As informações fornecidas aqui foram calculadas para alguém que deseja abrir uma posição com 500 dólares. As informações sobre taxa de saque não foram utilizadas nos cálculos.', // portekizce
            ru: 'Предоставленная здесь информация рассчитана для тех, кто хочет открыть позицию с 500 долларами. Информация о комиссии за вывод не использовалась при расчетах.', // rusça
            uk: 'Надана інформація була розрахована для тих, хто хоче відкрити позицію з 500 доларами. Інформація про вартість виведення не використовувалась у розрахунках.', // ukraynaca
            bg: 'Информацията, предоставена тук, е изчислена за някого, който иска да отвори позиция с 500 долара. Информацията за такса за теглене не е използвана в изчисленията.', // bulgarca
        },
        word25: {
            tr: 'Ana Sayfa', // türkçe
            en: 'Home', // ingilizce
            es: 'Inicio', // ispanyolca
            fr: 'Accueil', // fransızca
            cs: 'Domů', // çekçe
            de: 'Startseite', // almanca
            zh: '主页', // çince
            id: 'Beranda', // endonezya
            it: 'Home', // italyanca
            ja: 'ホーム', // japonca
            ko: '홈', // korece
            pt: 'Início', // portekizce
            ru: 'Главная', // rusça
            uk: 'Домашня', // ukraynaca
            bg: 'Начало', // bulgarca
        },
        
        word26: {
            tr: 'Coin Detayları', // türkçe
            en: 'Coin Details', // ingilizce
            es: 'Detalles de la Moneda', // ispanyolca
            fr: 'Détails de la Pièce', // fransızca
            cs: 'Podrobnosti mince', // çekçe
            de: 'Münzdetails', // almanca
            zh: '币种详情', // çince
            id: 'Rincian Koin', // endonezya
            it: 'Dettagli della Moneta', // italyanca
            ja: 'コインの詳細', // japonca
            ko: '코인 세부 정보', // korece
            pt: 'Detalhes da Moeda', // portekizce
            ru: 'Детали монеты', // rusça
            uk: 'Деталі Монети', // ukraynaca
            bg: 'Детайли за Монетата', // bulgarca
        },
        
    }


    return dic[wordId][lang]
    


}


export const getWord= (wordId)=>{
    dic = setWords(wordId)
    return dic
}





