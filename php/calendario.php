<?php
   header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
   <head>
      <?php $titolo = 'Calendario'; ?>
      <title><?php echo $titolo; ?></title>
   </head>

   <body>
      <?php
         $sql = new mysqli('localhost', 'scheggedistelle', '', 'my_scheggedistelle');
         if ($sql->connect_errno) { exit($sql->connect_error); }
         mysqli_set_charset($sql, "utf8");

         echo "<section id='books'>";
         getFiles($file[0]);
         echo "</section>".PHP_EOL;

         $sql->close();

         function getFiles($f) {
            global $sql;

            $query = $sql->query("SELECT * FROM $f");         
            while ($riga = $query->fetch_assoc()) {
               adding($f, $riga);
               statsing($f, $riga);
            }
         }

         function adding($cosa, $row) {
            $lettura = explode(',', $row["lettura"]);
            foreach($lettura as &$l) {
               $l = explode('/', $l);
            };
            $order = max(
               array_map(function($v) {
                  return max([
                     intval(str_replace('-', '', $v[0])),
                     intval(str_replace('-', '', $v[1]))
                     ]);
                  }, $lettura
               )
            );

            echo "<article class='$cosa {$row['possesso']} {$row['voto']} {$row['lingua']} ". str_replace(' ', '_', $row['stato_lettura']) ." ". preg_replace('/\,-*/', ' ', str_replace(' ', '_', $row['tag'])) ." ". preg_replace('/\,-*/', ' ', str_replace(' ', '_', $row['autore'])) ."' style='order: -$order'>";
            echo "<div><h2>{$row['titolo']}</h2>";
            echo ($row['sottotitolo'] ? "<h4>{$row['sottotitolo']}</h4>" : "");
            echo "<h3>" . (str_replace(',', ', ', $row['autore'])) . "</h3>";
            echo "<p class='dtls'>";
            echo ($row['voto'] ? "<span>{$row['voto']}&#9733;</span>" : "<span></span>");
            echo "<span>" . ($lettura[count($lettura)-1][1] !== "0000-00-00" ? $lettura[count($lettura)-1][1] : $lettura[count($lettura)-1][0]) . "</span>";
            echo "<span>{$row['stato_lettura']}</span>";
            echo "</p>";
            echo ($row['ultimo_letto'] ? "<p>Letto: {$row['ultimo_letto']}" . ($row['download'] ? " <a href='{$row['download']}'>~ Read</a>" : "") . "</p>" : "");
            echo ($row['numero_pagine'] ? "<p>{$row['numero_pagine']} pagine</p>" : "");
            echo ($row['isbn'] ? "<p>{$row['isbn']}</p>" : "");
            echo "<p>{$row['data_pubblicazione']}</p>";
            echo "<p>#" . (str_replace(',', ' #', $row['tag'])) . "</p>";
            echo ($row['volumi_poss'] ? "<p>&#128218; vol. {$row['volumi_poss']}</p>" : ($row['possesso'] == "Cartaceo" ? "<p>&#128218;</p>" : ""));
            echo "</div>";
            echo "<form action='modifica.php' method='post'><input style='display:none' type='text' name='file' value='$cosa' readonly><input style='display:none' type='text' name='id' value='{$row['id']}' readonly><input type='submit' value='+'></form>";
            echo ($row['img'] ? "<div class='cover'><img src='img/{$row['img']}'></div>" : "");
            echo "</div>";
            echo "</article>".PHP_EOL;
         }

         function statsing($cosa, $row) {
            global $stats;
            foreach($stats as $s => &$d) {
               if ($s == 'categoria') $d[$cosa] = !$d[$cosa] ? 1 : ++$d[$cosa];
               if (!$row[$s]) continue;

               $a = explode(',', $row[$s]);
               foreach($a as $b) {
                  if (!$d[$b]) $d[$b] = 0;
                  if ($s == 'possesso' && $row[$s] == 'Cartaceo' && $row['volumi_poss_tot']) $d[$b] += intval($row['volumi_poss_tot']);
                  else $d[$b]++;
               }
            }
         }
      ?>

      <script>
      </script>
   </body>
</html>
