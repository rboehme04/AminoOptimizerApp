<SafeAreaView style={styles.Content} edges={["left", "right", "bottom"]}>
        <NavBar
          title="Optimizer"
          isBold={true}
          isBackButton={false}
          rightActions={[
            {
              icon: <SettingsIcon size={24} color={Color.neutralWhite} />,
              onPress: () => router.push("/SettingsScreen"),
            },
          ]}
        />
        <View style={styles.headerButtonsContainer}>
          <QuestionButton onPress={() => router.push("/InfoScreen")} />
          <View style={styles.rezeptErstellenContainer}>
            <RezeptErstellenButton />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.oderAuswaehlenText}>oder auswählen:</Text>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.rezepteUndFilterContainer}>
        <RezSelectionAndFilterComponent isOptimizerHome={true} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Content: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 8,
  },
  headerContainer: {
    justifyContent: "center",
    paddingHorizontal: 0,
    gap: 12,
  },
  headerButtonsContainer: {
    paddingHorizontal: 16,
    gap: 10,
  },
  rezeptErstellenContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  oderAuswaehlenText: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
    textAlign: "center",
  },
  rezepteUndFilterContainer: {
    justifyContent: "center",
    paddingHorizontal: 8,
    gap: 10,
  },
  mealRowsContainer: {
    gap: 10,
  },
});