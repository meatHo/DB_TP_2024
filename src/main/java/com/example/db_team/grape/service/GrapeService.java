package com.example.db_team.grape.service;

import com.example.db_team.grape.entity.Grape;
import com.example.db_team.grape.repository.GrapeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GrapeService {

    private final GrapeRepository grapeRepository;

    @Transactional
    public void initializeGrapes() {

        List<Grape> grapes = new ArrayList<>();
        grapes.add(new Grape(0L, "Cabernet Sauvignon", "Full-bodied red wine with dark fruit flavors."));
        grapes.add(new Grape(0L, "Pinot Noir", "Light-bodied red wine with flavors of red fruits."));
        grapes.add(new Grape(0L, "Syrah/Shiraz", "Rich and spicy red wine."));
        grapes.add(new Grape(0L, "Merlot", "Soft and fruity red wine."));
        grapes.add(new Grape(0L, "Sangiovese", "Classic Italian red wine."));
        grapes.add(new Grape(0L, "Tempranillo", "Spanish red wine with hints of berries and tobacco."));
        grapes.add(new Grape(0L, "Malbec", "Argentinian red wine known for plum flavors."));
        grapes.add(new Grape(0L, "Chardonnay", "Full-bodied white wine."));
        grapes.add(new Grape(0L, "Sauvignon Blanc", "Crisp white wine with citrus flavors."));
        grapes.add(new Grape(0L, "Riesling", "Sweet or dry white wine with floral aromas."));
        grapes.add(new Grape(0L, "Chenin Blanc", "Versatile white wine."));
        grapes.add(new Grape(0L, "Moscato", "Sweet and fruity white wine."));

        grapeRepository.saveAll(grapes);
    }
}

