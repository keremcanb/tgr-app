import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  TouchableHighlight
} from 'react-native'

const InfoScreen = props => {
  return (
    <ScrollView>
      <View>
        <Text style={styles.container}>
          Bu aplikasyon, 2010 yılından beri faaliyette olan ve Tayland
          hakkındaki en ayrıntılı Türkçe kaynak olan taylandgezi.com sitesindeki
          bilgilerden derlenmiştir.
        </Text>
        <TouchableHighlight
          onPress={() => Linking.openURL('http://www.taylandgezi.com')}
        >
          <Image
            style={styles.logo}
            source={{
              uri:
                'http://www.taylandgezi.com/wp-content/uploads/2020/02/tgr-logo-full.png'
            }}
          />
        </TouchableHighlight>
        <Text style={styles.container}>
          Daha da fazla ve ayrıntılı bilgi için Google Play Books'ta bulunan
          Tayland Gezi Rehberi e-kitabını indirebilirsiniz.
        </Text>
        <TouchableHighlight
          onPress={() =>
            Linking.openURL(
              'https://play.google.com/store/books/details/Keremcan_B%C3%BCy%C3%BCkta%C5%9Fk%C4%B1n_Tayland_Gezi_Rehberi?id=eK10BgAAQBAJ'
          )}
        >
          <Image
            style={styles.image}
            source={{
              uri:
                'https://books.google.com/books/content/images/frontcover/eK10BgAAQBAJ?fife=w200-h300'
            }}
          />
        </TouchableHighlight>
        <Text style={styles.container}>© 2020 Keremcan Büyüktaşkın</Text>
        <Text style={styles.container}>
          Yazar, bilgilerin güncelliği, doğrululuğu & eksiksizliği hakkında
          hiçbir garanti vermemektedir. Bilgilerin kullanımından
          kaynaklanabilecek bir zarardan yazar sorumlu tutulamaz. Metinler &
          görseller üzerindeki tüm maddi ve manevi haklar, 5846 sayılı Fikir ve
          Sanat Eserleri Kanunu’na göre materyal sahibi Keremcan Büyüktaşkın’a
          aittir. Söz konusu metinler & görseller eser sahibinin izni olmadan
          kopyalanamaz, çoğaltılamaz, işlenemez, değiştirilemez, başka internet
          sitelerinde ve basılı yada görsel yayın yapan diğer mecralarda
          yayınlanamaz.
        </Text>
        <Text style={styles.container}>
          Kullanım hakkı yazara ait olmayan açık kullanımlı fotoğraflar
          Wikimedia Commons kaynaklı & CC BY-SA lisanslı, haritalar ise
          OpenStreetMap kaynaklı & ODbL lisanslıdırlar.
        </Text>
      </View>
    </ScrollView>
  )
}

InfoScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Hakkında'
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    fontSize: 19,
    lineHeight: 25,
    fontFamily: 'nunito-light',
    marginBottom: 5
  },
  image: {
    marginLeft: 100,
    marginRight: 100,
    width: 150,
    height: 200,
    marginBottom: 5
  },
  logo: {
    marginLeft: 50,
    marginRight: 50,
    width: 250,
    height: 50,
    marginBottom: 5
  }
})

export default InfoScreen
