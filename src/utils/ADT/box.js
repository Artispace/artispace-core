const LazyBox = g => ({
  map: f => LazyBox(() => f(g())),
  fold: f => f(g())
});

export default LazyBox;
